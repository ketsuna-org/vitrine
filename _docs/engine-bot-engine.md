---
layout: doc
title: "Engine — BotEngine"
translation_key: docs
category: engine
description: >
  Documentation de la classe BotEngine : orchestration des sessions de bots,
  cycle de vie, résolution Lavalink et système de debug replay.
---

# Engine — BotEngine

La classe `BotEngine` est le point d'entrée central du moteur d'exécution de bots. Elle orchestre plusieurs sessions de bots simultanément et expose les opérations de cycle de vie (démarrage, arrêt, rechargement), l'injection de variables, ainsi qu'un système de debug replay.

## Constructeur

```dart
BotEngine({
  required this.store,
  required this.callbacks,
});
```

| Paramètre   | Type                   | Description                              |
|-------------|------------------------|------------------------------------------|
| `store`     | `BotDataStore`         | Store de données pour charger la config  |
| `callbacks` | `BotEngineCallbacks`   | Callbacks de log, métriques et replay    |

## Propriétés

```dart
final BotDataStore store;
final BotEngineCallbacks callbacks;
```

### Sessions

```dart
final Map<String, BotSession> _sessions = {};
```

Session pooling interne. Chaque bot actif est stocké dans cette map, indexé par `botId`.

```dart
bool get isRunning => _sessions.values.any((s) => s.isActive);
```

Retourne `true` si au moins une session est active.

```dart
Set<String> get runningBotIds => _sessions.keys.toSet();
```

Retourne un snapshot des IDs de bots actuellement actifs.

## Cycle de vie des sessions

### `start(String token)`

```dart
Future<void> start(String token) async;
```

Démarre une session de bot avec un token. L'ID du bot est résolu plus tard via la gateway.

### `startWithId(String botId, String token)`

```dart
Future<void> startWithId(String botId, String token) async {
  if (_sessions.containsKey(botId) && _sessions[botId]!.isActive) {
    callbacks.onLog?.call('Bot $botId is already running.', botId: botId);
    return;
  }

  // Resolve Lavalink config from app data
  final appData = await store.getApp(botId);
  LavalinkConfig? lavalinkConfig;
  if (appData['lavalinkConfig'] is Map) {
    final raw = Map<String, dynamic>.from(appData['lavalinkConfig'] as Map);
    if ((raw['host'] ?? '').toString().trim().isNotEmpty) {
      lavalinkConfig = LavalinkConfig.fromJson(raw);
      callbacks.onLog?.call(
        'Lavalink config resolved: ${lavalinkConfig.host}:${lavalinkConfig.port} (SSL: ${lavalinkConfig.useSsl})',
        botId: botId,
      );
    }
  } else {
    callbacks.onLog?.call('No Lavalink config found in app data — music features disabled', botId: botId);
  }

  final session = BotSession(
    botId: botId,
    token: token,
    store: store,
    callbacks: callbacks,
    lavalinkConfig: lavalinkConfig,
  );

  _sessions[botId] = session;
  await session.start();
}
```

Démarre une session pour un `botId` spécifique. Le flux est :

1. Vérifie si le bot est déjà actif → log et retour anticipé
2. Résout la config Lavalink depuis `store.getApp(botId)`
3. Extrait `host`, `port`, `useSsl` du champ `lavalinkConfig` s'il existe
4. Si absent, log "No Lavalink config found — music features disabled"
5. Crée un `BotSession` avec le token, le store, les callbacks et la config Lavalink
6. Stocke la session dans `_sessions` et appelle `session.start()`

### `stop(String botId)`

```dart
Future<void> stop(String botId) async {
  final session = _sessions.remove(botId);
  if (session != null) {
    await session.stop();
  }
}
```

Retire la session de la map et appelle `session.stop()`.

### `reload(String botId)`

```dart
Future<void> reload(String botId) async {
  final session = _sessions[botId];
  if (session != null) {
    await session.reload();
  }
}
```

Recharge la configuration du bot via `session.reload()`. La session reste dans la map.

### `getSession(String botId)`

```dart
BotSession? getSession(String botId) => _sessions[botId];
```

Retourne la session active pour un `botId`, ou `null` si inexistante.

### `stopAll()`

```dart
Future<void> stopAll() async {
  final ids = _sessions.keys.toList();
  for (final id in ids) {
    await stop(id);
  }
}
```

Stoppe toutes les sessions actives en itérant sur une copie des clés.

### `injectVariables(String botId, Map<String, String> variables)`

```dart
void injectVariables(String botId, Map<String, String> variables) {
  _sessions[botId]?.injectVariables(variables);
}
```

Injecte des variables session-spécifiques dans la session du bot ciblé.

## Système Debug Replay

Le `BotEngine` intègre un système de capture et stockage des replays de debug, limité à 30 replays par bot.

### Propriétés internes

```dart
final Map<String, bool> _debugReplayEnabled = {};
final Map<String, List<Map<String, dynamic>>> _debugReplays = {};
```

### `isDebugReplayCapturing(String botId)`

```dart
bool isDebugReplayCapturing(String botId) => _debugReplayEnabled[botId] ?? false;
```

Retourne `true` si la capture de debug replay est activée pour le bot.

### `setDebugReplayCapturing(String botId, bool enabled)`

```dart
void setDebugReplayCapturing(String botId, bool enabled) {
  _debugReplayEnabled[botId] = enabled;
}
```

Active ou désactive la capture pour un bot.

### `saveDebugReplay(String botId, String label, List<Map<String, dynamic>> frames, int totalMs)`

```dart
void saveDebugReplay(
  String botId,
  String label,
  List<Map<String, dynamic>> frames,
  int totalMs,
) {
  final list = _debugReplays.putIfAbsent(botId, () => []);
  list.add({
    'botId': botId,
    'commandLabel': label,
    'triggeredAt': DateTime.now().toUtc().toIso8601String(),
    'actionCount': frames.length,
    'totalMs': totalMs,
    'frames': frames,
  });
  if (list.length > 30) {
    list.removeRange(0, list.length - 30);
  }
}
```

Stocke un replay avec sa timeline de frames. Chaque entrée contient :

| Champ           | Type                        | Description                                  |
|-----------------|-----------------------------|----------------------------------------------|
| `botId`         | `String`                    | ID du bot                                    |
| `commandLabel`  | `String`                    | Label de la commande déclenchée              |
| `triggeredAt`   | `String` (ISO 8601 UTC)     | Horodatage du déclenchement                  |
| `actionCount`   | `int`                       | Nombre d'actions (longueur de `frames`)       |
| `totalMs`       | `int`                       | Durée totale d'exécution en millisecondes     |
| `frames`        | `List<Map<String, dynamic>>`| Liste des frames d'exécution                 |

La limite est de **30 replays** par bot : les plus anciens sont supprimés automatiquement.

### `listDebugReplays(String botId, {int limit = 30})`

```dart
List<Map<String, dynamic>> listDebugReplays(String botId, {int limit = 30}) {
  final replays = _debugReplays[botId] ?? [];
  if (replays.length > limit) {
    return replays.sublist(replays.length - limit);
  }
  return replays;
}
```

Retourne les `limit` derniers replays stockés pour un bot (30 par défaut).

### `clearDebugReplays(String botId)`

```dart
void clearDebugReplays(String botId) {
  _debugReplays.remove(botId);
}
```

Supprime tous les replays enregistrés pour un bot.
