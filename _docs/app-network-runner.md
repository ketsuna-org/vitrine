---
layout: doc
title: "App — Couche réseau : Runner"
translation_key: docs
category: app
description: >
  Documentation de la couche réseau Runner de l'application Flutter Bot Creator :
  client HTTP pour le runner local, configuration multi-runners, résolution du runtime
  distant, et orchestrateur de sessions mobiles.
---

# App — Couche réseau : Runner

La couche **Runner** gère la communication entre l'application Flutter Bot Creator et le **runner local** (processus Dart ou conteneur Docker) qui exécute les bots Discord. Elle inclut également l'abstraction de résolution du runtime (manager, runner, local) et l'orchestrateur de sessions mobiles.

## Fichiers source

```
packages/app/lib/core/network/
├── runner_client.dart                 — Client HTTP REST pour le runner (1072 lignes)
├── runner_settings.dart               — Configuration et registre multi-runners (339 lignes)
├── remote_runtime.dart                — Résolution du runtime distant (339 lignes)
└── mobile_sessions_orchestrator.dart  — Sérialisation des sessions mobiles (17 lignes)
```

---

## Architecture globale

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          COUCHE RUNNER                                     │
│                                                                           │
│  ┌─────────────────────────┐    ┌────────────────────────────────────┐   │
│  │    RunnerSettings        │    │        RunnerClient                │   │
│  │                          │    │                                     │   │
│  │ • Registre multi-runners │    │  Implémente RemoteRuntimeClient    │   │
│  │ • Migration legacy       │    │                                     │   │
│  │ • Runner actif           │    │  Endpoints REST :                  │   │
│  │ • Association bot↔runner │    │  /health          — Santé          │   │
│  │ • Désactivation tempor.  │    │  /status          — Statut         │   │
│  └───────────┬──────────────┘    │  /metrics         — Métriques      │   │
│              │                   │  /bots/*          — Gestion bots   │   │
│              ▼                   │  /logs            — Logs           │   │
│  ┌─────────────────────────┐    │  /bots/{id}/debug-replays          │   │
│  │  RunnerConnectionConfig │    │  /bots/{id}/variables/*             │   │
│  │                          │    │  /bots/{id}/scheduled-triggers/*   │   │
│  │ • id, url, apiToken      │    │  /bots/{id}/inbound-webhooks/*     │   │
│  │ • createClient()         │    └────────────────────────────────────┘   │
│  └─────────────────────────┘                                              │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                    RemoteRuntime (Abstraction)                        │  │
│  │                                                                       │  │
│  │  enum RemoteRuntimeSource { local, runner, manager }                  │  │
│  │                                                                       │  │
│  │  resolveRemoteRuntime() → ResolvedRemoteRuntime                       │  │
│  │    ├── Manager prioritaire (si session valide)                        │  │
│  │    ├── Runner personnalisé (si configuré)                             │  │
│  │    └── Local (fallback desktop / mobile avec flag)                    │  │
│  │                                                                       │  │
│  │  describeManagerRuntimeFailure()  — Diagnostic erreurs manager       │  │
│  │  startManagerBotWithCreditRetry() — Retry avec crédits pub           │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │              MobileSessionsOrchestrator                               │  │
│  │                                                                       │  │
│  │  • runSerialized() — Chaînage séquentiel des opérations              │  │
│  │  • Évite les race conditions sur les sessions foreground             │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Interface `RemoteRuntimeClient`

Tous les clients runtime (Runner, Manager) implémentent l'interface abstraite `RemoteRuntimeClient` :

```dart
abstract class RemoteRuntimeClient {
  RemoteRuntimeSource get runtimeSource;

  Future<bool> checkHealth();
  Future<RunnerStatus> getStatus({String? botId});
  Future<RunnerMetrics> getMetrics({String? botId});
  Future<List<String>> getLogs({String? botId, int limit = 300});
  Future<Map<String, dynamic>> getCommandStats(String botId, {int hours = 24});

  Future<void> syncBot(String botId, String botName, Map<String, dynamic> configJson);
  Future<void> startBot(String botId, {String? botName});
  Future<Map<String, dynamic>> stopBot(String botId);

  Future<Map<String, dynamic>> getGatewayRuntime();
  Future<Map<String, dynamic>> getBotRuntime(String botId);
  Future<Map<String, dynamic>> getRunnerInfo();
  Future<List<Map<String, dynamic>>> listBots();

  Future<void> reloadBot(String botId, String botName, Map<String, dynamic> configJson, {bool force = false});

  // Commandes et workflows
  Future<void> syncCommand(String botId, String botName, String commandId, Map<String, dynamic> commandJson);
  Future<void> deleteCommand(String botId, String botName, String commandId);
  Future<void> syncWorkflow(String botId, String botName, String workflowName, Map<String, dynamic> workflowJson);
  Future<void> deleteWorkflow(String botId, String botName, String workflowName);

  // Variables
  Future<void> setGlobalVariable(String botId, String key, dynamic value);
  Future<void> removeGlobalVariable(String botId, String key);
  Future<void> renameGlobalVariable(String botId, String oldKey, String newKey);
  Future<void> setScopedVariableDefinition(String botId, String key, String scope, dynamic defaultValue, {String valueType});
  Future<void> removeScopedVariableDefinition(String botId, String key, {String? scope, bool purgeStoredValues});

  // Déclencheurs et webhooks
  Future<void> syncScheduledTrigger(String botId, String triggerId, Map<String, dynamic> triggerJson);
  Future<void> deleteScheduledTrigger(String botId, String triggerId);
  Future<void> syncInboundWebhook(String botId, String webhookId, Map<String, dynamic> webhookJson);
  Future<void> deleteInboundWebhook(String botId, String webhookId);
}
```

### `RemoteRuntimeSource`

```dart
enum RemoteRuntimeSource { local, runner, manager }
```

---

## `RunnerClient` — Client HTTP REST pour le runner

**Classe** : `RunnerClient` (implémente `RemoteRuntimeClient`)  
**Source runtime** : `RemoteRuntimeSource.runner`

Le `RunnerClient` communique avec le **runner local** (processus Dart ou conteneur Docker) via une API REST HTTP. Il supporte l'authentification par token API (Bearer).

### Constructeur

```dart
RunnerClient({
  required String baseUrl,
  String? apiToken,
  http.Client? httpClient,
  Duration? getTimeout,    // défaut : 10 secondes
  Duration? postTimeout,   // défaut : 30 secondes
})
```

L'URL de base est automatiquement nettoyée (suppression du slash final).

### Timeouts distincts

Le client distingue deux timeouts :
- **GET** (10s par défaut) : pour les opérations de lecture rapides
- **POST** (30s par défaut) : pour les opérations d'écriture ou de démarrage

### Méthodes HTTP

Les méthodes privées `_get()` et `_post()` gèrent :
- Construction des headers (content-type + Bearer token si configuré)
- Timeout spécifique selon la méthode
- Parsing JSON de la réponse
- Gestion des erreurs (status ≥ 400 → `RunnerClientException`)

Contrairement au `MainApiClient`, le `RunnerClient` n'a **pas** de circuit breaker ni de retry logic.

### Endpoints

#### Santé et informations

```dart
// Vérifie que le runner est joignable
Future<bool> checkHealth()
// → GET /health → vérifie json['ok'] == true

// Récupère la version du runner
Future<String?> getRunnerVersion()
// → GET / → extrait json['version']
```

#### Statut et métriques

```dart
// Statut global ou par bot
Future<RunnerStatus> getStatus({String? botId})
// Sans botId → GET /status
// Avec botId  → GET /bots/{botId}/status → adapte la réponse

// Métriques globales ou par bot
Future<RunnerMetrics> getMetrics({String? botId})
// Sans botId → GET /metrics
// Avec botId  → GET /bots/{botId}/metrics
```

#### Gestion des bots

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `listBots()` | `GET /bots` | Liste les bots synchronisés sur le runner |
| `syncBot(botId, botName, config, force)` | `POST /bots/sync` | Pousse une configuration complète |
| `startBot(botId, botName)` | `POST /bots/{botId}/start` | Démarre un bot (retourne `RunnerStatus`) |
| `stopBot(botId)` | `POST /bots/{botId}/stop` | Arrête un bot |
| `reloadBot(botId, botName, config, force)` | `POST /bots/{botId}/reload` | Recharge à chaud la configuration |

#### Commandes et workflows

| Méthode | Endpoint |
|---------|----------|
| `syncCommand(botId, botName, commandId, json)` | `POST /bots/{botId}/commands/sync` |
| `deleteCommand(botId, botName, commandId)` | `POST /bots/{botId}/commands/delete` |
| `syncWorkflow(botId, botName, name, json)` | `POST /bots/{botId}/workflows/sync` |
| `deleteWorkflow(botId, botName, name)` | `POST /bots/{botId}/workflows/delete` |

#### Déclencheurs et webhooks

| Méthode | Endpoint |
|---------|----------|
| `syncScheduledTrigger(botId, triggerId, json)` | `POST /bots/{botId}/scheduled-triggers/sync` |
| `deleteScheduledTrigger(botId, triggerId)` | `POST /bots/{botId}/scheduled-triggers/delete` |
| `syncInboundWebhook(botId, webhookId, json)` | `POST /bots/{botId}/inbound-webhooks/sync` |
| `deleteInboundWebhook(botId, webhookId)` | `POST /bots/{botId}/inbound-webhooks/delete` |

#### Logs et statistiques

```dart
Future<List<String>> getLogs({String? botId, int limit = 300})
// → GET /logs?limit=300 (ou /bots/{botId}/logs)

Future<Map<String, dynamic>> getCommandStats(String botId, {int hours = 24})
// → GET /bots/{botId}/command-stats?hours=24
```

#### Variables

| Méthode | Endpoint |
|---------|----------|
| `getGlobalVariables(botId)` | `GET /bots/{botId}/variables/global` |
| `setGlobalVariable(botId, key, value)` | `POST /bots/{botId}/variables/global/set` |
| `removeGlobalVariable(botId, key)` | `POST /bots/{botId}/variables/global/remove` |
| `renameGlobalVariable(botId, oldKey, newKey)` | `POST /bots/{botId}/variables/global/rename` |
| `getScopedVariableDefinitions(botId)` | `GET /bots/{botId}/variables/scoped-definitions` |
| `setScopedVariableDefinition(...)` | `POST /bots/{botId}/variables/scoped-definitions/set` |
| `removeScopedVariableDefinition(...)` | `POST /bots/{botId}/variables/scoped-definitions/remove` |
| `listScopedValuesForKey(botId, scope, key)` | `GET /bots/{botId}/variables/scoped-values?scope=X&key=Y` |

#### Debug Replay

```dart
// Récupère les replays de debug
Future<RunnerDebugReplaySnapshot> getDebugReplays(String botId, {int limit = 30})
// → GET /bots/{botId}/debug-replays?limit=30

// Efface tous les replays
Future<void> clearDebugReplays(String botId)
// → POST /bots/{botId}/debug-replays/clear

// Active/désactive la capture de replay
Future<bool> setDebugReplayCapturing(String botId, bool enabled)
// → POST /bots/{botId}/debug-replays/capture
```

### Cache de synchronisation

Le client maintient un cache de hash statique `_lastSyncedHashes` (clé : `{baseUrl}:{botId}`) pour éviter les synchronisations redondantes. Méthodes associées :

```dart
void resetSyncCache(String botId)      // Invalide le cache d'un bot
static void clearAllSyncCaches()       // Vide tous les caches
```

### Modèles de données

#### `RunnerBotRuntime`

État d'un bot sur le runner :

```dart
class RunnerBotRuntime {
  final String botId;
  final String botName;
  final String state;            // 'running', 'stopped', etc.
  final DateTime? lastSeenAt;
  final String? lastError;
  final int? baselineRssBytes;  // Mémoire baseline (octets)

  bool get isRunning => state == 'running';
}
```

#### `RunnerStatus`

Statut global du runner :

```dart
class RunnerStatus {
  final bool running;
  final List<RunnerBotRuntime> bots;
  final String? activeBotId;
  final String? activeBotName;

  bool isBotRunning(String botId);  // Vérifie si un bot spécifique tourne
}
```

#### `RunnerMetrics`

Métriques de performance :

```dart
class RunnerMetrics {
  final bool running;
  final List<RunnerBotRuntime> bots;
  final String? activeBotId;
  final int? rssBytes;              // Mémoire totale du process
  final int? baselineRssBytes;      // Mémoire baseline
  final int? botEstimatedRssBytes;  // Estimation mémoire du bot
  final double? cpuPercent;         // % CPU
  final int? storageBytes;          // Stockage utilisé (octets)
}
```

#### `RunnerBotSummary`

Résumé d'un bot synchronisé :

```dart
class RunnerBotSummary {
  final String id;
  final String name;
  final DateTime syncedAt;
}
```

#### `RunnerDebugReplaySnapshot`

Instantané de debug replay :

```dart
class RunnerDebugReplaySnapshot {
  final bool capturing;
  final List<Map<String, dynamic>> replays;
}
```

### Gestion des erreurs

```dart
class RunnerClientException implements Exception {
  final String message;
  final int? statusCode;
}
```

Le message d'erreur est extrait du champ `error` de la réponse JSON, avec fallback sur `reasonPhrase`.

---

## `RunnerSettings` — Configuration multi-runners

**Classe** : `RunnerSettings` (constructeur privé, méthodes statiques)

Gère un **registre de connexions runner** avec persistance dans `SharedPreferences`, migration automatique depuis l'ancien format singleton, et association bot ↔ runner.

### `RunnerConnectionConfig`

Configuration d'une connexion runner :

```dart
class RunnerConnectionConfig {
  final String id;         // Identifiant unique (timestamp base36)
  final String url;        // URL du runner (ex: http://192.168.1.42:8080)
  final String? apiToken;  // Token d'authentification
  final String? name;      // Label optionnel ("Production", "Dev Server")

  RunnerClient createClient({Duration? getTimeout, Duration? postTimeout});
}
```

### Registre multi-runners

Le registre est stocké dans `SharedPreferences` :

| Clé | Type | Description |
|-----|------|-------------|
| `runner_registry` | JSON array | Liste des `RunnerConnectionConfig` |
| `runner_active_id` | String | ID du runner actif |
| `runner_temporarily_disabled` | bool | Désactivation temporaire |
| `runner_bot_associations` | JSON object | Map `botId` → `runnerId` |
| `developer_runner_url` (legacy) | String | Ancien format URL unique |
| `developer_runner_api_token` (legacy) | String | Ancien format token unique |

### Migration legacy

Lors du premier accès au registre, `_migrateLegacy()` convertit automatiquement l'ancien format :

```
developer_runner_url + developer_runner_api_token
  → RunnerConnectionConfig(id=généré, url=..., apiToken=..., name="Default")
  → runner_registry = [config]
  → runner_active_id = config.id
  → Suppression des clés legacy
```

### Méthodes principales

| Méthode | Description |
|---------|-------------|
| `getRunners()` | Retourne tous les runners enregistrés |
| `getActiveId()` | Retourne l'ID du runner actif |
| `getConfig()` | Retourne le runner actif (ou null si désactivé) |
| `getStoredConfig()` | Retourne le runner actif même si désactivé |
| `createClient()` | Crée un `RunnerClient` pour le runner actif |
| `createClientForBot(botId)` | Crée un client pour le runner associé au bot |
| `getUrl()` | URL du runner actif |
| `getApiToken()` | Token API du runner actif |
| `addRunner(config)` | Ajoute/met à jour un runner (auto-sélection si unique) |
| `removeRunner(id)` | Supprime un runner (réaffecte l'actif si nécessaire) |
| `setActiveRunner(id)` | Définit le runner actif |
| `save(url, apiToken)` | Méthode rétro-compatible (met à jour le runner actif) |
| `setUrl(url)` | Rétro-compatible |
| `setApiToken(token)` | Rétro-compatible |
| `clear()` | Vide tout le registre |
| `associateBotWithRunner(botId, runnerId)` | Associe un bot à un runner spécifique |
| `getAssociatedRunnerId(botId)` | Récupère l'association d'un bot |
| `loadAssociations()` | Charge les associations depuis SharedPreferences |
| `isTemporarilyDisabled()` | Vérifie si le runner est temporairement désactivé |
| `setTemporarilyDisabled(bool)` | Active/désactive temporairement le runner |

### Association bot ↔ runner

L'association est maintenue en mémoire (`_botRunnerAssociation`) et persistée automatiquement. Elle permet d'affecter des bots spécifiques à des runners différents :

```dart
// Exemple
RunnerSettings.associateBotWithRunner('bot_abc', 'runner_xyz');
RunnerSettings.createClientForBot('bot_abc'); // → client pour runner_xyz
```

---

## `RemoteRuntime` — Résolution du runtime distant

**Fichier** : `remote_runtime.dart`

Ce module est le **point central de décision** qui détermine où un bot doit être exécuté : sur les serveurs Bot Creator (manager), sur un runner personnalisé, ou en local.

### `ResolvedRemoteRuntime`

Résultat de la résolution :

```dart
class ResolvedRemoteRuntime {
  final RemoteRuntimeSource source;    // manager, runner, ou local
  final RemoteRuntimeClient? client;   // Client si distant
  final String? detailLabel;           // Label affichable (URL, nom)
  final String? unavailableReason;     // Raison si non disponible

  bool get isLocal => source == RemoteRuntimeSource.local;
  bool get isRemote => client != null;
  bool get isManager => source == RemoteRuntimeSource.manager;
  bool get isRunner => source == RemoteRuntimeSource.runner;
  bool get blocksLocalFallback => source == RemoteRuntimeSource.manager && client == null;
}
```

### `resolveRemoteRuntime()`

Fonction principale de résolution. L'ordre de priorité est :

```
1. Web → Runner si configuré, sinon local
2. Association explicite bot↔runner (vérifiée en premier)
   ├── 'manager' + session valide → manager
   └── runner ID spécifique → runner
3. Si pas de support manager → runner ou local
4. Si Android + mode hébergement local activé → local
5. Si config MainApi + session valide (non desktop) → manager
6. Si iOS → manager (indisponible) avec message
7. Si runner configuré → runner
8. Fallback → local
```

**Paramètres** :

| Paramètre | Défaut | Description |
|-----------|--------|-------------|
| `supportsManagerRuntime` | — | Si la plateforme supporte le runtime manager |
| `botId` | null | Pour résolution par association |
| `getTimeout` | 30s | Timeout GET |
| `postTimeout` | 90s | Timeout POST |

### Logique par plateforme

| Plateforme | Comportement |
|------------|-------------|
| **Web** | Runner uniquement (si configuré), sinon local |
| **iOS** | Manager prioritaire ; local non supporté |
| **Android** | Manager ou local (selon flag `isMobileLocalHostingEnabled`) |
| **Desktop** (Win/Mac/Linux) | Runner uniquement, pas de manager |

### Messages d'indisponibilité

Les messages sont localisés (français/anglais) selon la locale du device :

- **iOS sans session** : « Le mode local n'est pas pris en charge sur iOS. Connectez-vous à Bot Creator dans les paramètres avant de démarrer ce bot. »
- **Session expirée** : « Votre session Bot Creator a expiré. Reconnectez-vous dans les paramètres pour démarrer ce bot. »
- **Non connecté** : « Connectez-vous à Bot Creator dans les paramètres avant de démarrer ce bot. »

### `describeManagerRuntimeFailure(client, error)`

Diagnostique la cause d'un échec de démarrage sur le manager :

1. Vérifie si l'erreur mentionne un `bot_id` invalide
2. Interroge `getRunnerInfo()` pour obtenir l'état du déploiement
3. Analyse le statut du job de déploiement :
   - `QUEUED` / `RUNNING` → message « démarrage en cours »
   - `FAILED` → message avec détails de l'erreur
   - `unreachable` / `DEGRADED` → message d'indisponibilité temporaire
4. Fallback : message générique

### `isPendingFreeRuntimeCreditError(error)`

Détecte si l'erreur est liée à un manque de crédits gratuits (`bot_free_time_required`).

### `isPendingManagerRunnerError(error)`

Détecte si l'erreur est liée à un runner non déployé (`runner_not_deployed`, `runner_unreachable`).

### `startManagerBotWithCreditRetry(client, botId, botName, timeout, retryDelay)`

Boucle de retry avec timeout pour le démarrage sur le manager :

- Timeout max : 15 secondes (par défaut)
- Retry toutes les 1 seconde
- Continue tant que l'erreur est `isPendingFreeRuntimeCreditError` ou `isPendingManagerRunnerError`
- Relance l'erreur si le timeout est dépassé ou si l'erreur est d'un autre type

---

## `MobileSessionsOrchestrator` — Sérialisation des sessions mobiles

**Classe** : `MobileSessionsOrchestrator`  
**Fichier** : `mobile_sessions_orchestrator.dart` (17 lignes)

Ce petit orchestrateur garantit que les opérations de démarrage/arrêt des sessions mobiles (foreground service) sont exécutées de manière **séquentielle**, évitant les race conditions.

```dart
class MobileSessionsOrchestrator {
  Future<void> _queue = Future<void>.value();

  Future<T> runSerialized<T>(Future<T> Function() operation) {
    final completer = Completer<T>();
    _queue = _queue.then((_) async {
      try {
        completer.complete(await operation());
      } catch (error, stackTrace) {
        completer.completeError(error, stackTrace);
      }
    });
    return completer.future;
  }
}
```

**Fonctionnement** :
- Un `_queue` interne chaîne les futures
- Chaque appel à `runSerialized()` est mis en file d'attente
- L'opération est exécutée seulement quand toutes les précédentes sont terminées
- Les erreurs sont propagées via le `Completer`

Ce pattern est utilisé pour sérialiser les appels au foreground service mobile, où des démarrages/arrêts concurrents pourraient causer des états incohérents.

---

## Résumé des responsabilités

| Composant | Responsabilité |
|-----------|---------------|
| `RemoteRuntimeClient` (interface) | Contrat commun pour tous les clients runtime (Runner et Manager) |
| `RemoteRuntimeSource` (enum) | Trois sources : `local`, `runner`, `manager` |
| `RunnerClient` | Client HTTP REST pour le runner local (santé, statut, métriques, logs, gestion bots, variables, debug replay) |
| `RunnerStatus` | Statut global du runner avec liste des bots |
| `RunnerMetrics` | Métriques runtime (RSS, CPU, stockage) |
| `RunnerBotRuntime` | État d'exécution d'un bot sur le runner |
| `RunnerBotSummary` | Résumé d'un bot synchronisé sur le runner |
| `RunnerDebugReplaySnapshot` | Instantané des replays de debug |
| `RunnerClientException` | Exception spécifique au runner |
| `RunnerConnectionConfig` | Configuration d'une connexion runner (id, url, token, nom) |
| `RunnerSettings` | Registre multi-runners, migration legacy, persistance, associations bot↔runner |
| `ResolvedRemoteRuntime` | Résultat de résolution (source, client, label, raison) |
| `resolveRemoteRuntime()` | Logique de décision : manager → runner → local |
| `describeManagerRuntimeFailure()` | Diagnostic des erreurs de démarrage manager |
| `startManagerBotWithCreditRetry()` | Retry intelligent pour le démarrage manager avec crédits pub |
| `isPendingFreeRuntimeCreditError()` | Détection erreur crédits gratuits |
| `isPendingManagerRunnerError()` | Détection erreur runner non déployé |
| `MobileSessionsOrchestrator` | Sérialisation des opérations de sessions mobiles |
