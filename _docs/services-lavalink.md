---
layout: doc
title: "Services — Lavalink (Audio & Musique)"
translation_key: docs
category: services
description: >
  Documentation des services Lavalink pour la musique et l'audio :
  LavalinkService (connexion, lecture, contrôles du player, health monitoring)
  et LavalinkListService (liste des serveurs publics Lavalink).
---

# Services — Lavalink (Audio & Musique)

Les services Lavalink permettent à un bot Discord de diffuser de l'audio dans les salons vocaux. Deux modules sont impliqués :

1. **`LavalinkService`** (`packages/shared/lib/services/lavalink_service.dart`, 352 lignes) — gestion complète du cycle de vie de la connexion Lavalink : création du plugin, health monitoring, connexion aux salons vocaux, lecture de pistes, gestion de file d'attente et contrôles du player.

2. **`LavalinkListService`** (`packages/shared/lib/services/lavalink_list_service.dart`, 103 lignes) — récupération et cache de la liste publique des serveurs Lavalink depuis l'API communautaire `lavalink-list.ajieblogs.eu.org`.

---

## Partie 1 — LavalinkService

### Classe `LavalinkSession`

Représente l'état runtime d'un player Lavalink pour une guild.

```dart
class LavalinkSession {
  final LavalinkPlayer player;
  final List<Track> queue;
  bool loop;
  int volume;
  bool isPaused;
}
```

**Propriétés :**

| Propriété         | Type              | Description                                                    |
|-------------------|-------------------|----------------------------------------------------------------|
| `player`          | `LavalinkPlayer`  | Instance du player Lavalink (via `nyxx_lavalink`)              |
| `queue`           | `List<Track>`     | File d'attente des pistes                                      |
| `loop`            | `bool`            | Mode boucle (défaut : `false`)                                 |
| `volume`          | `int`             | Volume actuel (0-200, défaut : 100)                            |
| `isPaused`        | `bool`            | État pause (défaut : `false`)                                  |

**Propriétés calculées :**

| Getter           | Type       | Description                                                       |
|------------------|------------|-------------------------------------------------------------------|
| `currentTrack`   | `Track?`   | Piste en cours (player actif ou index dans la queue)              |
| `isPlaying`      | `bool`     | `true` si `player.currentTrack != null`                           |
| `isConnected`    | `bool`     | `true` si le player est connecté (`player.state.isConnected`)     |
| `position`       | `Duration` | Position actuelle dans la piste (`player.state.position`)         |
| `queueSize`      | `int`      | Taille de la file d'attente (`queue.length`)                      |

**Méthodes :**

| Méthode                   | Retour   | Description                                                          |
|---------------------------|----------|----------------------------------------------------------------------|
| `nextTrack()`             | `Track?` | Avance à la piste suivante dans la queue (respecte le mode `loop`)  |
| `addToQueue(Track track)` | `void`   | Ajoute une piste à la fin de la file d'attente                      |
| `clearQueue()`            | `void`   | Vide la file d'attente et réinitialise l'index                      |

### Classe `LavalinkService`

Service principal de gestion audio Lavalink.

```dart
class LavalinkService {
  final LavalinkPlugin _plugin;
  final Map<Snowflake, LavalinkSession> _sessions;
  final void Function(String message)? onLog;
}
```

#### Constructeur

```dart
LavalinkService({
  required LavalinkPlugin plugin,
  required LavalinkConfig config,
  this.onLog,
})
```

| Paramètre | Type                   | Description                                        |
|-----------|------------------------|----------------------------------------------------|
| `plugin`  | `LavalinkPlugin`       | Plugin Lavalink initialisé (via `createPlugin`)    |
| `config`  | `LavalinkConfig`       | Configuration Lavalink du bot                      |
| `onLog`   | `void Function(String)?` | Callback optionnel pour les logs                 |

#### Méthodes statiques

##### `createPlugin(config)`

Crée une instance `LavalinkPlugin` à partir de la configuration du bot.

```dart
static LavalinkPlugin? createPlugin(LavalinkConfig? config)
```

- Si `config` est `null` → retourne `null`.
- Sinon, construit un `LavalinkPlugin` avec :
  - `base` : URI construite à partir de `config.host`, `config.port` et `config.useSsl` (schéma `http` ou `https`)
  - `password` : `config.password`

##### `testConnection(host, port, password, useSsl)`

Vérifie la connectivité au serveur Lavalink via l'endpoint REST `/v4/info`.

```dart
static Future<String?> testConnection({
  required String host,
  required int port,
  required String password,
  required bool useSsl,
})
```

- **Timeout** : 5 secondes.
- **Retour** : `null` en cas de succès (HTTP 200), ou un message d'erreur en cas d'échec :
  - `'Erreur {statusCode}'` si le code HTTP n'est pas 200
  - `'Connexion refusée : {message}'` si `ClientException`
  - `'Délai dépassé (5s)'` si `TimeoutException`
  - `e.toString()` pour toute autre erreur

#### Méthodes d'instance

##### `waitForReady()`

Attend que la connexion Lavalink soit établie. Timeout de 10 secondes.

```dart
Future<void> waitForReady()
```

- Écoute `_plugin.onReady.first`.
- En cas de timeout → lève `TimeoutException('Lavalink server did not respond within 10s')`.

##### `monitorHealth()`

Surveille la santé de la connexion Lavalink en écoutant plusieurs événements :

| Événement écouté       | Log généré                                                              |
|------------------------|-------------------------------------------------------------------------|
| `onWebsocketClosed`    | `Lavalink WebSocket closed: code={code} reason={reason}`                |
| `onTrackStuck`         | `Lavalink: track stuck — {title}`                                       |
| `onTrackException`     | `Lavalink: track exception — {message}`                                 |

##### `connect(client, guildId, channelId)`

Connecte le bot à un salon vocal et retourne la session.

```dart
Future<LavalinkSession> connect(
  NyxxGateway client,
  Snowflake guildId,
  Snowflake channelId,
)
```

- **Timeout** : 15 secondes.
- Si déjà connecté au même channel → retourne la session existante.
- Si une ancienne session existe pour la guild → transfère la queue et les paramètres (`loop`, `_queueIndex`) vers la nouvelle session.
- Auto-avancement de la queue : à la fin d'une piste (`reason == 'finished'` ou `'stopped'`), la piste suivante est jouée automatiquement.

##### `disconnect(guildId)`

Déconnecte le bot du salon vocal de la guild et nettoie la session.

```dart
Future<void> disconnect(Snowflake guildId)
```

##### `session(guildId)`

Récupère la session existante pour une guild (sans en créer).

```dart
LavalinkSession? session(Snowflake guildId)
```

#### Contrôles du player

| Méthode                                      | Description                                                         |
|----------------------------------------------|---------------------------------------------------------------------|
| `play(client, guildId, channelId, query)`   | Joue une piste. Supporte les URLs directes et la recherche YouTube (`ytsearch:`). Gère `TrackLoadResult`, `PlaylistLoadResult`, `SearchLoadResult`. Timeout 10s. |
| `pause(guildId)`                             | Met en pause la lecture                                             |
| `resume(guildId)`                            | Reprend la lecture                                                  |
| `skip(guildId)`                              | Passe à la piste suivante dans la queue (ou arrête si queue vide)   |
| `stop(guildId)`                              | Arrête la lecture et vide la queue                                  |
| `setVolume(guildId, volume)`                | Définit le volume (clampé entre 0 et 200)                           |
| `setLoop(guildId, loop)`                    | Active/désactive le mode boucle                                     |
| `seekTo(guildId, position)`                 | Se déplace à une position précise dans la piste                     |
| `dispose()`                                  | Déconnecte toutes les sessions et libère les ressources             |

#### Variables Lavalink injectées

Lors de l'exécution de workflows, les variables suivantes sont disponibles dans le contexte runtime :

| Variable                   | Description                                |
|----------------------------|--------------------------------------------|
| `lavalink.currentTrack`    | Titre de la piste en cours de lecture      |
| `lavalink.queueSize`       | Nombre de pistes dans la file d'attente    |
| `lavalink.volume`          | Volume actuel (0-200)                      |
| `lavalink.isPlaying`       | `'true'` si une piste est en cours         |
| `lavalink.isPaused`        | `'true'` si le player est en pause         |
| `lavalink.position`        | Position actuelle dans la piste (ms)       |
| `lavalink.loop`            | `'true'` si le mode boucle est activé      |

---

## Partie 2 — LavalinkListService

### Classe `LavalinkServerEntry`

Représente un serveur Lavalink de la liste publique.

```dart
class LavalinkServerEntry {
  final String uniqueId;
  final String identifier;
  final String host;
  final int port;
  final String password;
  final bool secure;
  final String version;
}
```

**Champs :**

| Champ        | Type     | Source JSON       | Défaut     |
|--------------|----------|-------------------|------------|
| `uniqueId`   | `String` | `unique-id`       | `''`       |
| `identifier` | `String` | `identifier`      | `''`       |
| `host`       | `String` | `host`            | `''`       |
| `port`       | `int`    | `port`            | `2333`     |
| `password`   | `String` | `password`        | `''`       |
| `secure`     | `bool`   | `secure`          | `false`    |
| `version`    | `String` | `version`         | `'v4'`     |

**Propriétés calculées :**

| Getter                 | Type   | Description                                                    |
|------------------------|--------|----------------------------------------------------------------|
| `label`                | `String` | Label lisible : `host:port (version, SSL)` ou `host:port (version)` |
| `badgeUrl(String type)` | `Uri`   | URL du badge de statut pour ce serveur                         |

### Classe `LavalinkListService`

Service de récupération de la liste des serveurs Lavalink publics.

```dart
class LavalinkListService {
  static const _baseUrl = 'https://lavalink-list.ajieblogs.eu.org';
}
```

**Base URL :** `https://lavalink-list.ajieblogs.eu.org`

#### Méthodes

##### `getServers({forceRefresh})`

Retourne la liste des serveurs, avec cache de 5 minutes.

```dart
Future<List<LavalinkServerEntry>> getServers({bool forceRefresh = false})
```

- Si le cache a moins de 5 minutes et `forceRefresh` n'est pas `true` → retourne le cache.
- Sinon → appelle `fetchServers()`.

##### `fetchServers()`

Récupère la liste complète des serveurs depuis l'API.

```dart
Future<List<LavalinkServerEntry>> fetchServers()
```

- **Endpoint :** `GET {_baseUrl}/All`
- **Timeout :** 10 secondes.
- **Fallback :** en cas d'erreur réseau, retourne le cache précédent s'il existe.
- **Cache :** met à jour `_cached` et `_lastFetch` après chaque succès.

---

## Flux d'utilisation typique

```
┌─────────────────────────────────────────────────────────────────┐
│                     DÉMARRAGE DU BOT                             │
│                                                                   │
│  1. LavalinkListService().getServers()                            │
│     → Liste des serveurs publics (pour UI de sélection)           │
│                                                                   │
│  2. LavalinkService.createPlugin(config.lavalinkConfig)           │
│     → Création du LavalinkPlugin (passé au GatewayClientOptions)  │
│                                                                   │
│  3. LavalinkService(config).monitorHealth()                       │
│     → Surveillance WS closures, track stuck, track exceptions    │
│                                                                   │
│  4. LavalinkService.waitForReady()                                │
│     → Attend la connexion (timeout 10s)                           │
│                                                                   │
│                     UTILISATION RUNTIME                            │
│                                                                   │
│  5. service.connect(client, guildId, channelId)                   │
│     → Connexion au salon vocal                                    │
│                                                                   │
│  6. service.play(client, guildId, channelId, query)               │
│     → Recherche et lecture d'une piste                            │
│                                                                   │
│  7. Contrôles : pause, resume, skip, stop, setVolume, seekTo     │
│                                                                   │
│  8. Variables injectées : lavalink.currentTrack, etc.             │
│                                                                   │
│                     ARRÊT                                          │
│                                                                   │
│  9. service.dispose()                                             │
│     → Déconnexion de toutes les guilds                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Notes importantes

- Le plugin Lavalink doit être passé aux options du client gateway (`GatewayClientOptions(plugins: [plugin])`) avant d'utiliser le service.
- La recherche de pistes utilise automatiquement le préfixe `ytsearch:` pour les requêtes qui ne sont pas des URLs.
- Les URLs directes (YouTube, SoundCloud, etc.) sont supportées sans préfixe.
- Le volume est clampé entre 0 et 200.
- Les playlists sont chargées entièrement dans la queue ; la première piste est jouée immédiatement.
- En cas d'échec de fetch, `LavalinkListService` retourne le dernier cache valide au lieu de planter.
