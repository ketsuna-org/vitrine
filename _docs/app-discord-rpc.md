---
layout: doc
title: "App — Discord RPC System"
translation_key: docs
category: app
description: >
  Documentation du système Discord Rich Presence de l'application Flutter Bot Creator :
  service de gestion RPC, client WebSocket IPC, construction de Rich Presence,
  et stockage des paramètres.
---

# App — Discord RPC System

Le système **Discord RPC** (Rich Presence) permet à l'application Flutter Bot Creator d'afficher l'activité en cours sur le profil Discord de l'utilisateur. Il indique quel bot est en cours d'édition, le nombre de bots actifs, et la source d'exécution (locale, serveur, ou Bot Creator Manager). Le système communique avec le client Discord local via le protocole IPC (sockets Unix sur Linux/macOS, named pipes sur Windows).

## Fichiers source

```
packages/app/lib/features/discord_rpc/logic/
├── discord_rpc_service.dart      — Service de gestion du RPC (724 lignes)
├── discord_rpc_client.dart       — Client IPC WebSocket (956 lignes)
├── discord_rich_presence.dart    — Construction de la Rich Presence (139 lignes)
└── discord_rpc_settings.dart     — Stockage des paramètres RPC (209 lignes)
```

---

## Architecture globale

```
┌──────────────────────────────────────────────────────────────────────┐
│                     DISCORD RPC SYSTEM                                │
│                                                                       │
│  ┌─────────────────────────┐     ┌────────────────────────────────┐  │
│  │   DiscordRpcService     │     │     DiscordRpcClient            │  │
│  │   (Singleton)           │     │                                  │  │
│  │                         │     │  • Connexion IPC locale          │  │
│  │  • initialize()         │     │  • Découverte automatique       │  │
│  │  • updateConfig()       │────▶│    - Unix : sockets discord-ipc │  │
│  │  • connectIfPossible()  │     │    - Windows : named pipes      │  │
│  │  • disconnect()         │     │  • Handshake (opcode 0)         │  │
│  │  • syncBotRuntimeState()│     │  • SET_ACTIVITY (opcode 1)      │  │
│  │  • snapshots (Stream)   │     │  • Ping/Pong (opcodes 3/4)      │  │
│  └───────────┬─────────────┘     └───────────────┬────────────────┘  │
│              │                                    │                   │
│              ▼                                    ▼                   │
│  ┌─────────────────────────┐     ┌────────────────────────────────┐  │
│  │ DiscordRpcSettingsStore │     │    DiscordRichPresence          │  │
│  │                         │     │                                  │  │
│  │ • SharedPreferences     │     │  • details (128 car. max)       │  │
│  │ • loadConfig/saveConfig │     │  • state (128 car. max)         │  │
│  │ • loadSession/clear     │     │  • timestamps (start)           │  │
│  └─────────────────────────┘     │  • Sanitization UTF-16          │  │
│                                   └────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │              Intégration avec PresenceManager                     │ │
│  │                                                                   │ │
│  │  Le DiscordRpcService est synchronisé avec le runtime des bots :  │ │
│  │  • syncBotRuntimeState() reçoit la liste des bots en cours        │ │
│  │  • Construit la Rich Presence avec buildBotCreatorRichPresence() │ │
│  │  • Pousse la présence via SET_ACTIVITY sur le client IPC         │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

---

## `DiscordRpcService` — Service de gestion RPC

**Classe** : `DiscordRpcService` (Singleton)  
**Pattern** : File d'attente série (`_serialQueue`) pour garantir l'atomicité des opérations.

Le `DiscordRpcService` est le point d'entrée principal du système RPC. Il expose un stream de snapshots (`Stream<DiscordRpcSnapshot>`) qui permet à l'interface utilisateur de réagir aux changements d'état en temps réel.

### États d'exécution (`DiscordRpcRuntimeState`)

| État | Description |
|------|-------------|
| `disabled` | RPC désactivé par la configuration |
| `unsupportedPlatform` | Plateforme non supportée (Web, mobile) |
| `transportUnsupported` | Transport IPC non disponible |
| `notConfigured` | Client ID manquant |
| `disconnected` | Déconnecté, en attente |
| `needsAuthorization` | Nécessite une autorisation OAuth |
| `connecting` | Connexion IPC en cours |
| `connected` | Connecté et prêt |
| `error` | Erreur de connexion ou d'envoi |

### API principale

```dart
// Initialisation (idempotente)
Future<DiscordRpcSnapshot> initialize()

// Mise à jour de la configuration
Future<DiscordRpcSnapshot> updateConfig({
  required bool enabled,
  required String clientId,
  required String clientSecret,
  required String brokerUrl,
})

// Tentative de connexion
Future<DiscordRpcSnapshot> connectIfPossible()

// Synchronisation avec l'état des bots
Future<DiscordRpcSnapshot> syncBotRuntimeState({
  required Set<String> runningBotIds,
  required Map<String, String> botNamesById,
  required RemoteRuntimeSource runtimeSource,
  String? preferredBotId,
  String? preferredBotName,
  String? activeSourceLabel,
})

// Déconnexion
Future<DiscordRpcSnapshot> disconnect({bool clearSession = false})
```

### Flux de connexion

```
1. initialize()
   ├─ Charge la config depuis SharedPreferences
   ├─ Nettoie les sessions OAuth legacy
   └─ Si enabled → connectIfPossible()

2. connectIfPossible()
   ├─ Vérifie la plateforme (desktop uniquement)
   ├─ Vérifie le transport (Linux, macOS, Windows)
   ├─ Vérifie la config (enabled + clientId)
   ├─ _ensureClientConnected()
   │   ├─ Crée un DiscordRpcClient
   │   ├─ Découverte IPC (sockets Unix ou pipes Windows)
   │   ├─ Handshake (opcode 0, v=1, client_id)
   │   └─ Attend l'événement READY
   └─ Pousse la présence si disponible

3. En cas d'échec → retry automatique après 10 secondes
```

### Snapshot

Le `DiscordRpcSnapshot` est un objet immuable contenant l'état complet du système :

```dart
class DiscordRpcSnapshot {
  final DiscordRpcConfig config;
  final DiscordRpcRuntimeState runtimeState;
  final DiscordRpcSession? session;
  final String? lastError;
  final String? connectedEndpoint;
  final String? controllingBotId;
  final String? controllingBotName;
  final DiscordRichPresence? lastPresence;
}
```

---

## `DiscordRpcClient` — Client IPC

**Classe** : `DiscordRpcClient`  
**Protocole** : Discord IPC (framing binaire, JSON payloads)

Le client gère la communication bas niveau avec le client Discord local.

### Transport

| Plateforme | Mécanisme | Détail |
|------------|-----------|--------|
| Linux | Socket Unix | `$XDG_RUNTIME_DIR/discord-ipc-{0..9}`, `$TMPDIR/...`, `/tmp/...` |
| macOS | Socket Unix | `$TMPDIR/discord-ipc-{0..9}`, `/tmp/...` |
| Windows | Named Pipe | `\\.\pipe\discord-ipc-{0..9}` avec retry loop |
| Web | N/A | `UnsupportedError` |

### Protocole de framing

Chaque trame IPC Discord est composée de :
- **4 octets** : opcode (little-endian)
- **4 octets** : longueur du payload (little-endian)
- **N octets** : payload JSON

Opcodes supportés :

| Opcode | Nom | Description |
|--------|-----|-------------|
| 0 | HANDSHAKE | Établissement de la connexion |
| 1 | FRAME | Commande/événement (JSON) |
| 2 | CLOSE | Fermeture de connexion |
| 3 | PING | Keep-alive |
| 4 | PONG | Réponse au ping |

### Commandes disponibles

```dart
// Connexion avec handshake
Future<void> connect({required String clientId})

// Autorisation OAuth
Future<Map<String, dynamic>> authorize({
  required String clientId,
  required List<String> scopes,
  String? rpcToken, String? username,
  String? responseType, String? state,
  String? prompt, String? codeChallenge,
  String? codeChallengeMethod,
})

// Authentification
Future<Map<String, dynamic>> authenticate(String accessToken)

// Mise à jour de l'activité
Future<Map<String, dynamic>> setActivity({
  required int pid,
  required Map<String, dynamic> activity,
})
```

### Gestion des événements

Le client expose un `Stream<Map<String, dynamic>> events` qui émet :
- **READY** : Handshake réussi
- **ERROR** : Erreur retournée par Discord
- **DISCONNECTED** : Déconnexion (transport fermé, erreur, ou close frame)

---

## `DiscordRichPresence` — Rich Presence

**Classe** : `DiscordRichPresence`  
**Fonction builder** : `buildBotCreatorRichPresence()`

### Structure de la présence

```dart
class DiscordRichPresence {
  final String details;    // 128 caractères max
  final String? state;     // 128 caractères max
  final DateTime? startTime; // Timestamp de début
}
```

### Construction contextuelle

La fonction `buildBotCreatorRichPresence()` adapte la présence selon le contexte :

**Aucun bot actif** :
- `details` : "Bot Creator open"
- `state` : "Bot Creator servers ready" / "Server mode ready" / "Desktop ready"

**Bots actifs** :
- `details` : "Running {nom du bot}"
- `state` : "Bot Creator {label}" ou "Server {label}" ou "Local desktop runtime"
- Si plusieurs bots : suffixe "• N bots active"
- `startTime` : horodatage UTC du début de l'exécution

### Sanitization UTF-16

Pour éviter les crashes de rendu Flutter, toutes les chaînes sont nettoyées :
- Les surrogates non appairés sont remplacés par `U+FFFD` (replacement character)
- La troncature à 128 caractères préserve les paires de surrogates
- Application de `_sanitizeUtf16()` sur les noms de bots et labels

---

## `DiscordRpcSettingsStore` — Stockage

**Classe** : `DiscordRpcSettingsStore` (static)

Stockage persistant via `SharedPreferences` :

| Méthode | Clé | Description |
|---------|-----|-------------|
| `loadConfig()` | `discord_rpc_config` | Charge la configuration RPC |
| `saveConfig(config)` | `discord_rpc_config` | Sauvegarde la configuration |
| `loadSession()` | `discord_rpc_session` | Charge la session OAuth |
| `saveSession(session)` | `discord_rpc_session` | Sauvegarde la session |
| `clearSession()` | `discord_rpc_session` | Efface la session |
| `clearAll()` | les deux | Réinitialisation complète |

### Configuration (`DiscordRpcConfig`)

```dart
class DiscordRpcConfig {
  final bool enabled;      // Activation du RPC
  // clientId, clientSecret, brokerUrl sont fixés/purgés
  // (l'application ID Discord est hardcodée : 1350824555119382678)
}
```

La configuration est volontairement simplifiée : seul le flag `enabled` est modifiable. Les champs `clientId`, `clientSecret` et `brokerUrl` (issus d'une version antérieure avec OAuth) sont ignorés.

### Session (`DiscordRpcSession`)

```dart
class DiscordRpcSession {
  final String accessToken;
  final String sessionToken;
  final DateTime expiresAt;
  final List<String> scopes;
  final String? userId;
  final String? username;
  final DateTime? authorizedAt;
}
```

La session OAuth est conservée pour rétrocompatibilité mais n'est plus utilisée dans la version actuelle (connexion IPC locale uniquement).

---

## Intégration avec PresenceManager

Le `DiscordRpcService` est distinct du `PresenceManager` (qui gère la présence côté bot Discord, pas côté application). Les deux systèmes sont complémentaires :

| Aspect | PresenceManager (Engine) | DiscordRpcService (App) |
|--------|--------------------------|-------------------------|
| Cible | Profil du bot Discord | Profil de l'utilisateur |
| Contenu | Statuts configurés par le bot | "Editing Bot Creator" |
| Transport | Gateway WebSocket Discord | IPC local |
| Rotation | Supporte la rotation de statuts | Présence fixe contextuelle |

---

## Cycle de vie complet

```
Démarrage de l'application
  │
  ├─ DiscordRpcService.initialize()
  │   ├─ Charge la config (enabled par défaut)
  │   └─ Si enabled → connectIfPossible()
  │
  ├─ Découverte IPC (sockets/pipes)
  │   ├─ Succès → handshake → READY → connected
  │   └─ Échec → retry 10s (Discord pas encore lancé)
  │
  ├─ syncBotRuntimeState() appelé à chaque changement
  │   ├─ Construit la Rich Presence contextuelle
  │   └─ Pousse SET_ACTIVITY si connecté
  │
  └─ Fermeture / désactivation
      ├─ disconnect() → close frame → nettoyage
      └─ updateConfig(enabled: false) → déconnexion
```
