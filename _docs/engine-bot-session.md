---
layout: doc
translation_key: docs
category: "Engine"
title: "Engine — BotSession"
description: >
  Documentation de la classe BotSession : session active de bot, connexion gateway
  Discord, gestion du cycle de vie, Lavalink, métriques et rotation de présence.
---

# Engine — BotSession

La classe `BotSession` représente une session active de bot avec sa connexion gateway Discord et l'ensemble de ses gestionnaires internes. C'est l'unité centrale du moteur d'exécution : elle encapsule le cycle de vie complet d'un bot, de la connexion à la déconnexion.

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                        BotSession                                 │
│                                                                  │
│  ┌───────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │WorkflowExecutor│  │ CommandExecutor   │  │ EventDispatcher   │  │
│  └───────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                  │
│  ┌───────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │PresenceManager │  │ NyxxGateway       │  │ LavalinkService   │  │
│  └───────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                  │
│  Métriques (périodique 30s)  │  Subscriptions (event listeners) │
└──────────────────────────────────────────────────────────────────┘
```

## Constructeur

```dart
BotSession({
  required this.botId,
  required this.token,
  required this.store,
  required this.callbacks,
  this.lavalinkConfig,
})
```

| Paramètre        | Type                  | Description                                      |
|------------------|-----------------------|--------------------------------------------------|
| `botId`          | `String`              | Identifiant unique du bot dans BDFD              |
| `token`          | `String`              | Token d'authentification Discord                 |
| `store`          | `BotDataStore`        | Accès aux données persistantes (config, commandes)|
| `callbacks`      | `BotEngineCallbacks`  | Callbacks de logging, métriques, cycle de vie    |
| `lavalinkConfig` | `LavalinkConfig?`     | Configuration Lavalink optionnelle pour la musique|

À l'instanciation, le constructeur crée trois gestionnaires internes :

- **`WorkflowExecutor`** — Cœur d'exécution qui itère sur les listes d'actions compilées.
- **`CommandExecutor`** — Exécute les commandes slash et interactions.
- **`EventDispatcher`** — Route les événements Discord vers les commandes et workflows.

Ces trois gestionnaires reçoivent tous une référence à `injectVariables` pour la résolution de variables de session.

## Cycle de vie

### `start()` — Démarrage du bot

La méthode `start()` suit une séquence précise en 11 étapes :

```
1. Charge les intents depuis l'app data
2. Force "Voice States" si Lavalink est configuré
3. Construit les gateway intents via _buildGatewayIntents()
4. Se connecte à Discord via Nyxx.connectGateway()
5. Lavalink : pré-check REST /v4/info (timeout 5s)
   → Si OK : crée le plugin et connecte en background (waitForReady, timeout 10s)
   → Si échec : musique désactivée (lavalinkService = null)
6. Débug : écoute les événements onVoiceStateUpdate et onVoiceServerUpdate
7. Stocke startedAt, cache ownerId (fetchCurrentApplication), commandCount
8. Démarre PresenceManager avec résolution de templates
9. reload() pour appliquer la présence et la config
10. Enregistre les event listeners via EventDispatcher
11. Démarre le metrics reporting (périodique 30s + rapport initial à 5s)
```

> **Leçon apprise** : Le plugin Lavalink ne doit **jamais** être passé dans `GatewayClientOptions.plugins` avant la connexion gateway. Si le serveur Lavalink est down, le plugin bloque l'établissement de la connexion Discord. La solution est de connecter Lavalink en background **après** l'ouverture du gateway, avec un pré-check REST et un timeout de 10 secondes sur `waitForReady()`.

### `reload()` — Rechargement à chaud

Recharge la configuration du bot **sans reconnecter** le gateway :

- Recharge les statuts (`statuses`) et la présence (`presenceStatus`) depuis le store
- Redémarre le `PresenceManager` avec les nouvelles valeurs
- Rafraîchit le `commandCount` à partir du store

Appelée automatiquement à la fin de `start()`, et peut être appelée manuellement lors d'un changement de config.

### `stop()` — Arrêt du bot

Nettoie toutes les ressources dans l'ordre :

1. Retire le bot de `botStartTimes` (map globale)
2. Annule les timers de métriques (`_metricsTimer`, `_initialMetricsTimer`)
3. Arrête le `PresenceManager` (annule les timers de rotation)
4. Vide le `InteractionListenerRegistry` pour ce bot
5. Annule toutes les subscriptions (event listeners)
6. Ferme la connexion gateway (`_gateway.close()`)
7. Émet l'événement `onLifecycleChange('stopped')`

## Injection de variables

```dart
void injectVariables(Map<String, String> variables)
```

Injecte les variables de session dans un map, utilisé par `CommandExecutor` et `EventDispatcher` pour la résolution de templates :

| Variable                    | Source                          |
|-----------------------------|---------------------------------|
| `bot.ownerId`               | `_ownerId` (fetchCurrentApplication) |
| `bot.commands`              | `_commandCount` (toString)      |
| `bot.commandsCount`         | `_commandCount` (toString)      |
| `bot.slashCommandsCount`    | `_commandCount` (toString)      |
| `bot.uptime`                | `DateTime.now() - _startedAt` (ms) |

## Intents Gateway

### `_buildGatewayIntents()` — Mapping des 13 intents

Convertit un `Map<String, bool>` (issu de l'app data) en `Flags<GatewayIntents>` Nyxx :

| Clé (app data)                  | Flag Nyxx                          |
|---------------------------------|------------------------------------|
| `Guild Presence`                | `GatewayIntents.guildPresences`    |
| `Guild Members`                 | `GatewayIntents.guildMembers`      |
| `Voice States`                  | `GatewayIntents.guildVoiceStates`  |
| `Message Content`               | `GatewayIntents.messageContent`    |
| `Direct Messages`               | `GatewayIntents.directMessages`    |
| `Guilds`                        | `GatewayIntents.guilds`            |
| `Guild Messages`                | `GatewayIntents.guildMessages`     |
| `Guild Message Reactions`       | `GatewayIntents.guildMessageReactions` |
| `Direct Message Reactions`      | `GatewayIntents.directMessageReactions` |
| `Guild Message Typing`          | `GatewayIntents.guildMessageTyping` |
| `Direct Message Typing`         | `GatewayIntents.directMessageTyping` |
| `Guild Scheduled Events`        | `GatewayIntents.guildScheduledEvents` |
| `Auto Moderation Configuration` | `GatewayIntents.autoModerationConfiguration` |
| `Auto Moderation Execution`     | `GatewayIntents.autoModerationExecution` |

Si aucun intent n'est coché, la valeur par défaut `GatewayIntents.allUnprivileged` est utilisée.

## Métriques

### `_startMetricsReporting()`

Démarre un timer périodique toutes les **30 secondes**, plus un rapport initial après **5 secondes**.

### `_reportMetrics()`

Collecte et émet les métriques via `callbacks.onMetrics` :

| Métrique         | Source                                    |
|------------------|-------------------------------------------|
| `guildCount`     | `gateway.guilds.cache.length`            |
| `shardsCount`    | `gateway.gateway.shards.length` (ou 1)   |
| `latencyMs`      | `shards.first.latency.inMilliseconds`    |
| `uptimeSeconds`  | `DateTime.now() - _startedAt`            |
| `memoryUsageBytes`| `0` (non supporté actuellement)         |
| `cpuUsagePercent` | `0.0` (non supporté actuellement)       |

## Propriétés exposées

| Propriété          | Type                  | Description                                |
|--------------------|-----------------------|--------------------------------------------|
| `botId`            | `String`              | Identifiant du bot                         |
| `token`            | `String`              | Token Discord                              |
| `store`            | `BotDataStore`        | Store de données                           |
| `lavalinkConfig`   | `LavalinkConfig?`     | Config Lavalink (null si pas de musique)   |
| `gateway`          | `NyxxGateway?`        | Connexion gateway (null si non connecté)   |
| `lavalinkService`  | `LavalinkService?`    | Service Lavalink (null si non connecté)    |
| `ownerId`          | `String`              | ID du propriétaire de l'application        |
| `commandCount`     | `int`                 | Nombre de commandes du bot                 |
| `isActive`         | `bool`                | `true` si le gateway est connecté          |
| `workflowExecutor` | `WorkflowExecutor`    | Exécuteur de workflows                     |
