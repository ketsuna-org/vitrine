---
layout: doc
title: "Application — Vue d'ensemble de l'architecture"
translation_key: docs
category: app
description: >
  Documentation de l'architecture de l'application Flutter Bot Creator :
  point d'entrée main.dart, singleton AppManager, initialisation des services
  (Firebase, PostHog, publicités), providers, foreground service mobile,
  et implémentation du BotDataStore.
---

# Application — Vue d'ensemble de l'architecture

Ce document décrit l'architecture de l'application Flutter **Bot Creator**, depuis le point d'entrée (`main.dart`) jusqu'aux mécanismes de stockage et de services d'arrière-plan.

---

## Point d'entrée — `main.dart`

Le fichier `main.dart` (~725 lignes) est le point d'entrée unique de l'application. Il orchestre toute la phase de bootstrap avant l'affichage du premier écran.

### Fonction `main()`

```dart
Future<void> main() async {
  HttpOverrides.global = _WindowsHttpOverrides();
  await runZonedGuarded(() async {
    WidgetsFlutterBinding.ensureInitialized();
    // Réglage du cache d'images (200 max, 50 Mo)
    await AppDiagnostics.initialize();
    AppDiagnostics.installGlobalErrorHandlers();
    FlutterForegroundTask.initCommunicationPort();
    await _bootstrapAndRunApp();
  }, (error, stack) async {
    // Capture des erreurs fatales avec distinction réseau/application
  });
}
```

**Étapes clés :**

1. **`HttpOverrides`** : Active une dérogation TLS pour Windows (compatibilité certificats).
2. **`runZonedGuarded`** : Capture toutes les erreurs asynchrones non interceptées, en distinguant les erreurs réseau transitoires (`SocketException`, `HandshakeException`, etc.) des vraies erreurs applicatives. Les erreurs réseau sont loguées sans être remontées à Crashlytics.
3. **`WidgetsFlutterBinding.ensureInitialized()`** : Initialise le binding Flutter.
4. **Cache d'images** : Limité à 200 entrées / 50 Mo (au lieu de 1000/100 Mo par défaut) pour éviter les OOM sur mobile.
5. **`AppDiagnostics`** : Initialise le système de diagnostic et installe les handlers d'erreurs globaux.
6. **`FlutterForegroundTask.initCommunicationPort()`** : Initialise le canal de communication avec le service d'arrière-plan mobile.

### Fonction `_bootstrapAndRunApp()`

```dart
Future<void> _bootstrapAndRunApp() async {
  appManager = AppManager();           // Singleton lazy
  FlutterUxcam.startWithConfiguration(...);  // Enregistrement de session UXCam
  initRunnerAutoReload();              // Hook de rechargement runner
  final prefs = await SharedPreferences.getInstance();
  final onboardingManager = OnboardingManager(prefs);
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => LocaleProvider()),
        Provider(create: (_) => onboardingManager),
      ],
      child: const MyApp(),
    ),
  );
  warmUpFuture = _warmUpServicesAfterLaunch();  // Fire-and-forget
}
```

1. Instancie le singleton **`AppManager`** (stockage, état global).
2. Démarre **UXCam** pour l'enregistrement des sessions utilisateur.
3. Initialise le hook **`initRunnerAutoReload()`** pour le rechargement à chaud des runners.
4. Charge les **SharedPreferences** et détermine si l'onboarding doit être affiché.
5. Lance l'application avec **`MultiProvider`** exposant trois providers :
   - **`ThemeProvider`** — mode clair/sombre persistant.
   - **`LocaleProvider`** — langue de l'interface.
   - **`OnboardingManager`** — état de l'onboarding (premier lancement).
6. Déclenche **`_warmUpServicesAfterLaunch()`** en mode fire-and-forget (non bloquant pour l'UI).

### Warm-up post-lancement

La fonction `_warmUpServicesAfterLaunch()` initialise les services lourds de manière séquentielle, chacun avec un timeout :

| Service | Timeout | Rôle |
|---|---|---|
| Main API session restore | 8 s | Restaure la session API via refresh token |
| Firebase | 10 s | `Firebase.initializeApp()` + activation collecte auto |
| PostHog | 10 s | `PosthogService.init()` — analytics produit |
| Crashlytics | 5 s | Configuration conditionnelle (mobile uniquement) |
| Ad consent flow | 15 s | `AdConsentService.ensureCanRequestAds()` |
| Rewarded ads | 15 s | `AdRewardService.initialize()` |
| Native ads | 15 s | `AdNativeService.initialize()` |
| Subscription service | 15 s | `SubscriptionService.initialize()` |
| Main API client hashes | 5 s | `MainApiClient.initialize()` |
| Debug replay state | 5 s | Restaure l'état de capture debug replay |
| Discord RPC | 5 s | `DiscordRpcService.instance.initialize()` |
| Notification service | 10 s | `NotificationService.instance.initialize()` |
| Runner associations | 5 s | `RunnerSettings.loadAssociations()` |

Chaque étape est wrappée dans `_runStartupTask()`, qui applique un timeout sans bloquer le démarrage : si un service ne répond pas dans le délai imparti, l'erreur est loguée et l'application continue.

### Widget `MyApp`

- **`MaterialApp`** avec thème Material 3, support de l'internationalisation, et mode clair/sombre.
- **Routage** :
  - Page d'accueil conditionnelle : `OnboardingPage` si premier lancement, sinon `MyMainPage` (HomePage + navigation).
  - Routes nommées : `/home`, callbacks OAuth (`/oauth/main-api/discord`).
- La méthode `initState` déclenche la demande de transparence de tracking (iOS) et active la collecte analytics.

### `StartupFailureApp`

Widget de secours affiché si le bootstrap échoue avant `runApp`. Montre l'erreur, les logs de diagnostic, et permet de les copier dans le presse-papier.

---

## `AppManager` — Singleton de gestion d'état

### Emplacement

**Fichier** : `packages/app/lib/core/storage/database.dart`
**Interface** : `BotDataStore` (définie dans `packages/shared/lib/bot/bot_data_store.dart`)

### Design Pattern

`AppManager` est un **singleton lazy-initialisé** :

```dart
@pragma('vm:entry-point')
AppManager get appManager => _appManager ??= AppManager();

class AppManager implements BotDataStore {
  static final AppManager _instance = AppManager._internal();
  factory AppManager() => _instance;
  AppManager._internal() { unawaited(_init()); }
}
```

Le `@pragma('vm:entry-point')` garantit que le getter `appManager` n'est pas tree-shaké par le compilateur Dart, ce qui est critique pour le foreground service mobile (qui s'exécute dans un isolate séparé).

### Initialisation interne

```dart
Future<void> _init() async {
  // 1. Création du répertoire apps/
  // 2. Initialisation SQLite (SqliteVariableStore) — fallback JSON si échec
  // 3. Chargement de la liste des apps depuis all_apps.json
  // 4. Démarrage du stream d'apps (polling toutes les 2 secondes)
}
```

### État géré

| Variable | Type | Description |
|---|---|---|
| `_apps` | `List<dynamic>` | Liste des bots enregistrés (index) |
| `_variableStore` | `SqliteVariableStore` | Stockage SQLite pour les variables scopées |
| `_sqliteAvailable` | `bool` | Flag indiquant si SQLite est opérationnel |
| `_appWriteChains` | `Map<String, Future<void>>` | Chaînes d'écriture sérialisées par bot |
| `_commandListCache` | `Map` | Cache des listes de commandes |
| `_payloadCache` | `Map` | Cache des payloads complets |
| `_appsStreamController` | `StreamController` | Stream broadcast de la liste d'apps |

### Hooks d'événements

`AppManager` expose des callbacks statiques que d'autres modules peuvent enregistrer pour réagir aux modifications :

```dart
static Future<void> Function(String botId)? onAfterSave;
static Future<void> Function(String botId, String commandId, Map<String, dynamic>)? onAfterCommandSave;
static Future<void> Function(String botId, String commandId)? onAfterCommandDelete;
static Future<void> Function(String botId, String workflowName, Map<String, dynamic>)? onAfterWorkflowSave;
// ... etc. pour global variables, scoped variables, triggers, webhooks
```

Ces hooks permettent au **BotEngine** et au **RunnerClient** d'être notifiés des changements et de recharger les bots à chaud.

---

## Implémentation de `BotDataStore`

`BotDataStore` est l'interface abstraite qui définit le contrat de stockage pour les données des bots. `AppManager` l'implémente avec un backend **JSON sur disque + SQLite**.

### Stockage des apps (JSON)

Chaque bot est stocké dans un fichier JSON individuel :

```
{app_storage_path}/apps/{botId}.json
```

Un fichier d'index centralise la liste :

```
{app_storage_path}/apps/all_apps.json
```

**Opérations** :
- `createOrUpdateApp()` : Crée ou met à jour un bot (token, intents, avatar, etc.). Sérialise les écritures via `_enqueueAppWrite()` pour éviter les corruptions concurrentes.
- `getApp()` : Lit le fichier JSON du bot.
- `deleteApp()` : Supprime le fichier JSON, les stats de commandes, et le répertoire du bot. Enregistre une entrée dans `_deleted_bots.json` (tombstone).
- `deleteBotCompletely()` : Point d'entrée unique pour la suppression complète — efface d'abord côté cloud (API Manager + S3), puis localement.
- `reapDeletedBots()` : Après une restauration, ré-applique les suppressions enregistrées.

### Variables globales

Stockées dans le champ `globalVariables` du JSON du bot :

```dart
Future<Map<String, dynamic>> getGlobalVariables(String id)
Future<void> setGlobalVariable(String id, String key, dynamic value, {String? ttl})
Future<void> removeGlobalVariable(String id, String key)
Future<void> renameGlobalVariable(String id, String oldKey, String newKey)
```

### Variables scopées

Deux backends selon la disponibilité de SQLite :

- **SQLite** (`SqliteVariableStore`) : Supporte les TTL, les requêtes paginées, les index.
- **Fallback JSON** : Stockées dans le champ `scopedVariables` du JSON.

Opérations : `getScopedVariables`, `setScopedVariable`, `getScopedVariable`, `removeScopedVariable`, `renameScopedVariable`, plus les opérations sur tableaux (`pushScopedArrayElement`, `popScopedArrayElement`, etc.).

### Commandes et workflows

- `listAppCommands()` : Liste les commandes d'un bot.
- `saveAppCommand()` : Persiste une commande.
- `getWorkflows()` : Récupère les workflows.
- `getWorkflowByName()` : Recherche un workflow par nom (insensible à la casse).

### Cache de payload

`AppManager` maintient un cache de payload (`_payloadCache`) pour éviter de reconstruire le payload complet à chaque requête. Le cache est invalidé à chaque modification d'un bot.

### Écritures sérialisées

Pour éviter les corruptions, toutes les écritures sur un même bot sont sérialisées via `_enqueueAppWrite()` :

```dart
Future<T> _enqueueAppWrite<T>(String id, Future<T> Function() action) {
  // Chaîne les écritures pour un bot donné
  // Garantit qu'une seule écriture est en cours à la fois par bot
}
```

---

## Providers exposés

Au niveau de l'application (`_bootstrapAndRunApp`), trois providers sont injectés via `MultiProvider` :

### `ThemeProvider` (ChangeNotifier)

```dart
class ThemeProvider extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.dark;
  // Persistance dans SharedPreferences (clé 'theme_mode')
  // Bascule light/dark avec notifyListeners()
}
```

### `LocaleProvider` (ChangeNotifier)

Gère la langue de l'interface utilisateur. Expose la locale courante et permet de la changer. Le `MaterialApp` est configuré avec `supportedLocales` et `localizationsDelegates`.

### `OnboardingManager` (Provider)

Détermine si l'utilisateur est au premier lancement (`isFirstRun`) et conditionne l'affichage de `OnboardingPage` vs `MyMainPage`.

---

## Foreground Service Mobile

### Contexte

Sur mobile (Android/iOS), les bots doivent continuer à fonctionner même lorsque l'application est en arrière-plan. Le package `flutter_foreground_task` permet d'exécuter un **service d'arrière-plan** avec une notification persistante.

### Initialisation

```dart
// Dans bot.mobile_service.dart
Future<void> initForegroundService({int eventIntervalMs = 5000}) async {
  FlutterForegroundTask.init(
    androidNotificationOptions: AndroidNotificationOptions(
      channelId: 'foreground_service',
      channelName: 'Foreground Service Notification',
      onlyAlertOnce: true,
    ),
    iosNotificationOptions: IOSNotificationOptions(
      showNotification: true,
      playSound: false,
    ),
    foregroundTaskOptions: ForegroundTaskOptions(
      eventAction: ForegroundTaskEventAction.repeat(5000),
      autoRunOnBoot: false,
      allowWakeLock: true,
      allowWifiLock: true,
    ),
  );
}
```

### Démarrage et arrêt

- **`startService()`** : Démarre le service avec un `serviceId: 110`, une notification « Bots are running », et un bouton « Stop ».
- **`startCallback()`** (entry-point annoté `@pragma('vm:entry-point')`) : Appelé dans l'isolate du service. Enregistre `DiscordBotTaskHandler`.
- **`stopMobileBotSession()`** : Arrête le service si plus aucune session mobile n'est active.

### `DiscordBotTaskHandler`

Gère le cycle de vie du service d'arrière-plan :

```dart
class DiscordBotTaskHandler extends TaskHandler {
  // onStart : Crée un AppManager + BotEngine dédiés dans l'isolate
  // onRepeatEvent : Toutes les 5 secondes, synchronise les flags de debug
  //                 et émet les métriques (RSS, CPU, guild count)
  // onReceiveData : Reçoit les commandes du process principal
  //   - mobile_sessions_sync : synchronise les bots à démarrer/arrêter
  //   - mobile_bot_reload : recharge la config d'un bot
  //   - mobile_flags_sync : synchronise les flags de debug
  // onDestroy : Arrête tous les bots ; redémarre le service si timeout
  // onNotificationButtonPressed : Gère le bouton "Stop" de la notification
}
```

### Communication inter-processus

Le process principal et le service communiquent via `FlutterForegroundTask.sendDataToTask()` (principal → service) et `FlutterForegroundTask.sendDataToMain()` (service → principal).

Les types de messages du service vers le principal :

| Type | Description |
|---|---|
| `bot_log` | Log de bot (normal ou debug) |
| `bot_lifecycle` | Événement de cycle de vie (started/stopped) |
| `bot_metrics` | Métriques runtime (RSS, CPU, stockage, guilds) |

### Orchestrateur de sessions

`MobileSessionsOrchestrator` garantit que les opérations de démarrage/arrêt des sessions mobiles sont exécutées en série, évitant les race conditions.

---

## Fonctions globales et état partagé

### `currentLogList`

```dart
final LogBuffer currentLogList = LogBuffer(maxEntries: 5000);
```

Buffer thread-safe limité à 5000 entrées. Les entrées les plus anciennes sont automatiquement évincées.

### `gateways`

```dart
final Map<String, NyxxGateway> gateways = <String, NyxxGateway>{};
```

Registre des connexions gateway Discord actives, indexées par bot ID.

### `setBotRuntimeActive(bool active)`

Fonction globale qui met à jour l'état d'activité des bots. Lorsque `active` passe à `false`, les métriques sont réinitialisées (RSS baseline, CPU, stockage).

### `appManager`

Getter global avec `@pragma('vm:entry-point')` qui garantit l'accès au singleton depuis n'importe quel isolate.

---

## Flux de démarrage d'un bot

```
Utilisateur appuie sur "Démarrer"
  │
  ├─ Plateforme desktop ?
  │   └─ startDesktopBot(token)
  │       └─ getDiscordUser(token) → botId
  │           └─ _engine.startWithId(botId, token)
  │               └─ BotEngine connecte la gateway Nyxx
  │                   └─ onLifecycleChange → setBotRuntimeActive(true)
  │
  └─ Plateforme mobile ?
      └─ startMobileBotSession(botId, token)
          └─ Écriture des sessions dans FlutterForegroundTask
          └─ Si service inactif → startService() → startCallback()
          └─ Sync des sessions vers le service
              └─ DiscordBotTaskHandler._syncSessions()
                  └─ _engine.startWithId() pour chaque nouveau bot
                  └─ _engine.stop() pour les bots retirés
```

---

## Résumé des responsabilités

| Composant | Responsabilité |
|---|---|
| `main.dart` / `_bootstrapAndRunApp` | Bootstrap, injection providers, warm-up services |
| `AppManager` | Stockage persistant (JSON + SQLite), état des apps, hooks |
| `BotDataStore` (interface) | Contrat de stockage (apps, commandes, variables, workflows) |
| `BotEngine` | Moteur d'exécution des bots (connexion Discord, exécution commandes) |
| `DiscordBotTaskHandler` | Gestion du cycle de vie du service d'arrière-plan mobile |
| `ThemeProvider` / `LocaleProvider` | Thème et langue de l'interface |
| `OnboardingManager` | Détection premier lancement |
| `LogBuffer` | Buffer de logs thread-safe |
| `flutter_foreground_task` | Service d'arrière-plan pour l'exécution mobile continue |
