---
layout: doc
title: "App — Bot Runtime"
translation_key: docs
category: app
description: >
  Documentation du module Bot Runtime dans l'application Flutter Bot Creator :
  intégration du BotEngine, callbacks, système de logs, debug replays,
  templates et service foreground mobile.
---

# App — Bot Runtime

Le module `bot.dart` et ses quatre part files constituent la couche d'exécution des bots dans l'application Flutter. Il instancie le moteur `BotEngine`, connecte les callbacks de supervision, et expose l'ensemble des fonctions de contrôle (start/stop/reload) ainsi que les flux de logs, métriques et replays.

## Fichiers

| Fichier                  | Rôle                                                        |
|--------------------------|--------------------------------------------------------------|
| `bot.dart`               | Instance globale du BotEngine, callbacks, fonctions publiques |
| `bot.logs.dart`          | Logs circulaires, métriques runtime (RSS, CPU, stockage)     |
| `bot.debug_replay.dart`  | Modèles et stockage en mémoire des debug replays             |
| `bot.template.dart`      | Résolution de templates (placeholder → valeur)               |
| `bot.mobile_service.dart`| Service foreground Android/iOS, multi-sessions, synchronisation |

---

## 1. Instance du BotEngine et callbacks — `bot.dart`

Le moteur est instancié une fois globalement :

```dart
final BotEngine _engine = BotEngine(
  store: appManager,
  callbacks: BotEngineCallbacks(
    onLog: (msg, {required botId}) => appendBotLog(msg, botId: botId),
    onDebugLog: (msg, {botId}) => appendBotLog(msg, botId: botId),
    onLifecycleChange: (event, {required botId}) { ... },
    onMetrics: (metrics, {required botId}) {
      appManager.updateGuildCount(botId, metrics.guildCount);
    },
    onReplayCaptured: (botId, label, frames, totalMs) { ... },
    isDebugReplayCapturing: (botId) =>
        _engine.isDebugReplayCapturing(botId) || isDebugReplayCapturing,
  ),
);
```

### Callbacks configurés

| Callback               | Comportement                                                                 |
|------------------------|------------------------------------------------------------------------------|
| `onLog`                | Ajoute une entrée horodatée dans le buffer circulaire de logs               |
| `onDebugLog`           | Identique à `onLog` — utilisé pour les messages de debug                     |
| `onLifecycleChange`    | Met à jour `_botRuntimeActive` quand un bot démarre ou que tous sont arrêtés |
| `onMetrics`            | Met à jour le compteur de guildes (`guildCount`) dans le store applicatif    |
| `onReplayCaptured`     | Persiste le replay via `_engine.saveDebugReplay` et l'ajoute en mémoire       |
| `isDebugReplayCapturing`| Combine l'état du moteur et l'état local (mobile service)                   |

### Fonctions publiques exposées

```dart
// Démarrage / arrêt desktop
Future<void> startDesktopBot(String token);
Future<void> stopDesktopBot({String? botId});

// Cycle de vie
Future<void> refreshBotRuntime(String botId);
void applyDesktopRuntimeSettings({required String botId, required Map<String, dynamic> appData});

// État
bool get isDesktopBotRunning;
bool get isBotRuntimeActive;
bool get isBotDebugLogsEnabled;
void setBotDebugLogsEnabled(bool enabled);

// Desktop running IDs
Set<String> get desktopRunningBotIds;
NyxxGateway? desktopGatewayForBot(String botId);

// Intents
Flags<GatewayIntents> buildGatewayIntents(Map<String, bool>? intentsMap);

// Commandes Discord
Future<void> createCommand(NyxxRest client, ApplicationCommandBuilder commandBuilder, ...);
Future<void> updateCommand(NyxxRest client, Snowflake commandId, ...);
```

### Gestion des IDs de bots (desktop et mobile)

Deux ensembles distincts d'IDs sont maintenus :

| Ensemble              | Usage                                         |
|-----------------------|-----------------------------------------------|
| `_engine.runningBotIds`| Sessions actives sur le moteur desktop        |
| `_mobileRunningBotIds` | Sessions mobiles, synchronisées via le service foreground |

La propriété `isBotRuntimeActive` est vraie dès qu'au moins un bot tourne, desktop ou mobile.

---

## 2. Système de logs et métriques — `bot.logs.dart`

### Modèle `BotRuntimeMetrics`

Instantané des métriques d'exécution pour un bot :

```dart
class BotRuntimeMetrics {
  final int? rssBytes;           // Mémoire RSS du processus
  final int? estimatedRssBytes;  // RSS moins la baseline
  final double? cpuPercent;      // CPU en pourcentage (0-100)
  final int? storageBytes;       // Stockage disque utilisé
  final int? baselineRssBytes;   // Baseline RSS capturée au démarrage
  final DateTime? baselineCapturedAt;
}
```

### `appendBotLog(message, {botId, source})`

Ajoute une ligne horodatée dans le bucket correspondant au bot. Si la ligne commence déjà par un timestamp (format `[HH:MM:SS]` ou ISO 8601), elle est conservée telle quelle.

```dart
void appendBotLog(
  String message, {
  String? botId,
  RemoteRuntimeSource source = RemoteRuntimeSource.local,
});
```

### Buffer circulaire

Chaque bucket (identifié par `source::botId`) est limité à `_maxBotLogLines` (500 lignes). Au-delà, les lignes les plus anciennes sont supprimées.

### Clés de bucket

| Clé                  | Description                           |
|----------------------|---------------------------------------|
| `local::{botId}`     | Logs d'un bot desktop spécifique      |
| `local::__global__`  | Logs globaux (sans botId)             |
| `runner::{botId}`    | Logs d'un runner distant              |

### Flux de logs

```dart
Stream<List<String>> getBotLogsStream();                         // Logs du bot actif
Stream<List<String>> getBotLogsStreamForBot(String? botId);     // Logs filtrés par bot (local)
Stream<List<String>> getBotLogsStreamForBotFromSource(botId, {required source});
List<String> getBotLogsSnapshot();
List<String> getBotLogsSnapshotForBot(String? botId);
```

### Flux de métriques

```dart
Stream<int?> getBotProcessRssStream();
Stream<int?> getBotEstimatedRssStream();
Stream<double?> getBotProcessCpuStream();
Stream<int?> getBotProcessStorageStream();

// Variantes filtrées par bot
Stream<int?> getBotProcessRssStreamForBot(String? botId);
Stream<double?> getBotProcessCpuStreamForBot(String? botId);
// ... et leurs équivalents FromSource
```

### Capture des métriques

- **RSS** : lecture de `ProcessInfo.currentRss` (mémoire résidente du processus)
- **CPU** : lecture de `/proc/self/stat` (Linux/Android), delta entre deux échantillons rapporté au nombre de cœurs
- **Stockage** : parcours récursif du répertoire `apps/{botId}` pour calculer la taille cumulée
- **Baseline** : capturée au début de chaque session (`startBotLogSession`) ; l'`estimatedRssBytes` est la différence entre le RSS courant et la baseline

### Sessions de logs

```dart
void startBotLogSession({required String botId, RemoteRuntimeSource source = RemoteRuntimeSource.local});
void endBotLogSession({required String botId, RemoteRuntimeSource source = RemoteRuntimeSource.local, bool clearLogs = true});
```

`endBotLogSession` nettoie les logs et métriques du bucket s'il était actif.

### Debug logs

```dart
void appendBotDebugLog(String message, {String? botId, RemoteRuntimeSource source = RemoteRuntimeSource.local});
```

N'ajoute la ligne que si `_debugBotLogsEnabled` est `true`. L'état est persisté via `FlutterForegroundTask.saveData`.

### Consommation des données du service foreground

```dart
void consumeForegroundTaskDataForBotLogs(Object data);
```

Traite les messages provenant du `DiscordBotTaskHandler` mobile :
- `bot_log` → `appendBotLog`
- `bot_lifecycle` → `addMobileRunningBotId` / `removeMobileRunningBotId`
- `bot_metrics` → `_updateBotMetrics` + `appManager.updateGuildCount`
- `debug_replay` → `appendDebugReplay`

---

## 3. Debug replays — `bot.debug_replay.dart`

### Modèle `DebugActionFrame`

Une frame d'action individuelle capturée pendant l'exécution d'un workflow :

```dart
class DebugActionFrame {
  final String actionType;                     // Type d'action (ex: "SendMessage", "SetVariable")
  final int startMs;                           // Début relatif en ms
  final int durationMs;                        // Durée de l'action
  final String? result;                        // Résultat ou message d'erreur
  final int? loopDepth;                        // Profondeur de boucle
  final int? loopIteration;                    // Itération courante
  final Map<String, String>? variablesBefore;  // Variables avant l'action
  final Map<String, String>? variablesAfter;   // Variables après l'action

  bool get isError;  // true si result commence par "Error:"
}
```

### Modèle `DebugReplayRecord`

Enregistrement complet d'un replay :

```dart
class DebugReplayRecord {
  final String commandLabel;              // Nom de la commande
  final DateTime triggeredAt;             // Horodatage du déclenchement
  final String botId;                     // ID du bot
  final List<DebugActionFrame> frames;    // Liste des frames
  final int totalMs;                      // Durée totale

  bool get hasError;     // Au moins une frame en erreur
  int get actionCount;   // Nombre de frames
}
```

### Stockage en mémoire

Les replays sont conservés dans une liste `_debugReplays`, limitée à `_maxDebugReplays = 30` entrées. L'insertion se fait en tête de liste (les plus récents d'abord). Un `StreamController` broadcast notifie les abonnés à chaque ajout ou vidage.

```dart
bool get isDebugReplayCapturing;
Stream<List<DebugReplayRecord>> get debugReplaysStream;
List<DebugReplayRecord> get debugReplays;

void setDebugReplayCapturing(bool enabled);
void appendDebugReplay(DebugReplayRecord record);
void clearDebugReplays();
```

### Persistance de l'état de capture

L'état `_debugReplayCapturing` est persisté via `FlutterForegroundTask.saveData` et restauré au démarrage via `loadDebugReplayCapturingState()`. Tout changement est également synchronisé avec le service mobile (`syncMobileDebugFlagsWithService`).

---

## 4. Templates — `bot.template.dart`

Ce part file est minimal et expose une seule fonction marquée `@pragma('vm:entry-point')` :

```dart
@pragma('vm:entry-point')
String updateString(String initial, Map<String, String> updates) {
  return resolveTemplatePlaceholders(initial, updates);
}
```

Elle délègue à `resolveTemplatePlaceholders` (importé depuis `bot_creator_shared`) et permet la résolution de placeholders dans les templates de bots. L'annotation `vm:entry-point` garantit que la fonction reste disponible après tree-shaking, notamment dans l'isolat du service mobile.

**Note** : L'import/export de templates (JSON) et les fonctions `createBotFromTemplate` / `exportBotAsTemplate` sont gérées par d'autres modules de l'application (marketplace, storage). Le présent part file ne contient que le helper de résolution de placeholders utilisé par le runtime.

---

## 5. Service foreground mobile — `bot.mobile_service.dart`

Ce part file gère l'exécution des bots sur mobile via un service foreground Android/iOS basé sur `flutter_foreground_task`.

### Orchestrateur de sessions

```dart
final MobileSessionsOrchestrator _mobileSessionsOrchestrator = MobileSessionsOrchestrator();
```

Toutes les opérations de démarrage/arrêt sont sérialisées via `_mobileSessionsOrchestrator.runSerialized()` pour éviter les races conditions.

### Gestion multi-bots

Les sessions sont stockées sous forme de `Map<String, String>` (botId → token) et persistées via `FlutterForegroundTask.saveData` sous la clé `mobile_bot_sessions`. Un fallback legacy (clés `token` + `running_bot_id`) est supporté en lecture.

| Fonction                                    | Rôle                                           |
|---------------------------------------------|------------------------------------------------|
| `startMobileBotSession({botId, token})`     | Ajoute le bot, démarre le service si nécessaire |
| `stopMobileBotSession({botId})`             | Retire le bot, arrête le service si plus aucun  |
| `getConfiguredMobileBotIds()`               | Liste les IDs configurés                        |
| `getReadyMobileBotIds()`                    | Liste les IDs dont le statut est `started`      |
| `syncMobileBotSessionsWithService()`        | Force la synchronisation des sessions           |
| `syncMobileDebugFlagsWithService()`         | Synchronise les flags de debug                  |
| `syncMobileBotConfigWithService(botId)`     | Notifie le service d'un reload de config        |

### Initialisation du service

```dart
Future<void> initForegroundService({int eventIntervalMs = 5000});
```

Configure `FlutterForegroundTask` avec :
- **Android** : canal de notification `foreground_service`, wake lock WiFi
- **iOS** : notification visible, sans son
- **Intervalle** : événement répété toutes les `eventIntervalMs` ms (clampé entre 1s et 60s)

### Démarrage

```dart
Future<void> startService();
```

Lance le service avec :
- `serviceId: 110`
- Titre de notification : *"Bots are running"*
- Bouton *"Stop"*
- Callback `startCallback`
- Retry automatique en cas d'erreur `dead channel`

### `DiscordBotTaskHandler`

Handler exécuté dans l'isolat du service foreground :

```dart
@pragma('vm:entry-point')
class DiscordBotTaskHandler extends TaskHandler {
  late final BotEngine _engine;
  AppManager? _manager;
}
```

#### Cycle de vie

| Méthode            | Comportement                                                             |
|--------------------|--------------------------------------------------------------------------|
| `onStart`          | Crée un `BotEngine` dédié avec ses propres callbacks, lit les sessions persistées, synchronise le flag debug |
| `onRepeatEvent`    | Synchronise le flag debug, émet les métriques pour chaque bot actif      |
| `onDestroy`        | Arrête tous les bots ; si timeout, redémarre automatiquement le service  |
| `onReceiveData`    | Traite les commandes du main isolate (sync sessions, reload, sync flags) |
| `onNotificationButtonPressed` | Si bouton *Stop*, arrête le service                            |

#### Communication main-isolate → service

Les commandes sont envoyées via `FlutterForegroundTask.sendDataToTask` :

| Commande                  | Clé `type`              | Effet                        |
|---------------------------|-------------------------|------------------------------|
| `mobile_sessions_sync`    | `_mobileCommandSyncSessions` | `_syncSessions(sessions)` |
| `mobile_bot_reload`       | `_mobileCommandReloadBot`    | `_engine.reload(botId)`   |
| `mobile_flags_sync`       | `_mobileCommandSyncFlags`    | `_syncDebugFlagFromMain()` |

#### Communication service → main-isolate

Les callbacks du `BotEngine` mobile émettent vers le main isolate :

```dart
FlutterForegroundTask.sendDataToMain({ 'type': 'bot_log', 'botId': ..., 'message': ... });
FlutterForegroundTask.sendDataToMain({ 'type': 'bot_lifecycle', 'botId': ..., 'state': ... });
FlutterForegroundTask.sendDataToMain({ 'type': 'bot_metrics', 'botId': ..., 'rssBytes': ..., ... });
```

Le main isolate les consomme via `consumeForegroundTaskDataForBotLogs()`.

### Logs Nyxx dans le service mobile

```dart
void _bindMobileNyxxLogs() {
  Logger.root.level = Level.ALL;
  _mobileNyxxLogsSubscription = Logger.root.onRecord.listen((record) { ... });
}
```

Les logs Nyxx de niveau `WARNING` ou supérieur sont remontés au main isolate. Tous les logs (y compris debug) sont également envoyés si `_debugBotLogsEnabled` est actif.

### Timeout et résilience

Si `onDestroy` est appelé avec `isTimeout = true`, le service émet un log *"Service interrupted (timeout), restarting..."* et se redémarre automatiquement.

### État "ready" des bots mobiles

La liste des bots dont le statut est `started` est persistée sous la clé `mobile_ready_bot_ids`. Elle est mise à jour à chaque événement de cycle de vie et consultable via `getReadyMobileBotIds()`.

---

## Résumé : dépendances entre les part files

```
bot.dart (fichier principal)
 ├── part 'bot.logs.dart'
 │   ├── appendBotLog()          ← appelé par onLog / onDebugLog
 │   ├── consumeForegroundTaskDataForBotLogs() ← données mobile → logs
 │   └── Métriques (RSS, CPU, stockage)
 ├── part 'bot.debug_replay.dart'
 │   ├── appendDebugReplay()     ← appelé par onReplayCaptured
 │   └── setDebugReplayCapturing() → syncMobileDebugFlagsWithService()
 ├── part 'bot.template.dart'
 │   └── updateString()          ← résolution de placeholders
 └── part 'bot.mobile_service.dart'
     ├── DiscordBotTaskHandler   ← BotEngine dédié dans l'isolat mobile
     ├── Communication bidirectionnelle main ↔ service
     └── Orchestrateur de sessions sérialisé
```

Toutes les fonctions de contrôle (start/stop/reload) transitent par l'instance globale `_engine`, que ce soit sur desktop ou dans le `DiscordBotTaskHandler` mobile.
