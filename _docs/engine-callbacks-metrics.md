---
layout: doc
title: "Engine — Callbacks & Métriques Runtime"
translation_key: docs
category: engine
description: >
  Documentation des classes BotEngineCallbacks et BotRuntimeMetrics :
  système de callbacks du cycle de vie des bots et snapshot de métriques runtime.
---

# Engine — Callbacks & Métriques Runtime

Le système de callbacks permet de réagir aux événements du cycle de vie des bots et de collecter les métriques d'exécution. Deux classes composent ce module.

## BotEngineCallbacks

```dart
class BotEngineCallbacks {
  const BotEngineCallbacks({
    this.onLog,
    this.onDebugLog,
    this.onLifecycleChange,
    this.onMetrics,
    this.onReplayCaptured,
    this.isDebugReplayCapturing,
  });
}
```

Classe de callbacks immutable (`const`) émise par `BotEngine` durant le cycle de vie et l'exécution des bots. Tous les champs sont optionnels.

### `onLog`

```dart
final void Function(String message, {required String botId})? onLog;
```

Émis pour les logs généraux du bot. Reçoit un message texte et l'ID du bot concerné (obligatoire).

### `onDebugLog`

```dart
final void Function(String message, {String? botId})? onDebugLog;
```

Émis pour les logs de debug verbeux. L'ID du bot est optionnel (`String?`).

### `onLifecycleChange`

```dart
final void Function(String event, {required String botId})? onLifecycleChange;
```

Émis lors d'un changement d'état du cycle de vie du bot. L'`event` est une chaîne décrivant le nouvel état (ex. `'started'`, `'stopped'`). L'ID du bot est obligatoire.

### `onMetrics`

```dart
final void Function(BotRuntimeMetrics metrics, {required String botId})? onMetrics;
```

Émis lorsque les métriques runtime d'un bot sont mises à jour. Reçoit une instance de `BotRuntimeMetrics` et l'ID du bot (obligatoire).

### `onReplayCaptured`

```dart
final void Function(
  String botId,
  String commandLabel,
  List<Map<String, dynamic>> frames,
  int totalMs,
)? onReplayCaptured;
```

Émis lorsqu'un debug replay est capturé. Paramètres positionnels :

| Paramètre      | Type                        | Description                              |
|----------------|-----------------------------|------------------------------------------|
| `botId`        | `String`                    | ID du bot                                |
| `commandLabel` | `String`                    | Label de la commande déclenchée          |
| `frames`       | `List<Map<String, dynamic>>`| Liste des frames d'exécution             |
| `totalMs`      | `int`                       | Durée totale en millisecondes            |

### `isDebugReplayCapturing`

```dart
final bool Function(String botId)? isDebugReplayCapturing;
```

Fonction qui retourne `true` si la capture de debug replay est activée pour le bot donné.

---

## BotRuntimeMetrics

```dart
class BotRuntimeMetrics {
  const BotRuntimeMetrics({
    required this.guildCount,
    required this.shardsCount,
    required this.latencyMs,
    required this.uptimeSeconds,
    required this.memoryUsageBytes,
    required this.cpuUsagePercent,
  });
}
```

Snapshot immutable des métriques runtime d'un bot. Tous les champs sont obligatoires.

### Champs

```dart
final int guildCount;
final int shardsCount;
final int latencyMs;
final int uptimeSeconds;
final int memoryUsageBytes;
final double cpuUsagePercent;
```

| Champ               | Type     | Description                                     |
|---------------------|----------|-------------------------------------------------|
| `guildCount`        | `int`    | Nombre de serveurs (guildes)                    |
| `shardsCount`       | `int`    | Nombre de shards actifs                         |
| `latencyMs`         | `int`    | Latence en millisecondes                        |
| `uptimeSeconds`     | `int`    | Temps d'activité en secondes                    |
| `memoryUsageBytes`  | `int`    | Utilisation mémoire en octets                   |
| `cpuUsagePercent`   | `double` | Pourcentage d'utilisation CPU                   |

### `toJson()`

```dart
Map<String, dynamic> toJson() => {
  'guildCount': guildCount,
  'shardsCount': shardsCount,
  'latencyMs': latencyMs,
  'uptimeSeconds': uptimeSeconds,
  'memoryUsageBytes': memoryUsageBytes,
  'cpuUsagePercent': cpuUsagePercent,
};
```

Sérialise les métriques en `Map<String, dynamic>` avec les clés identiques aux noms des champs. Toutes les valeurs conservent leur type natif (`int` ou `double`).
