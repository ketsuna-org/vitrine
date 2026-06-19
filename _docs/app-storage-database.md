---
layout: doc
title: "Application — Stockage local : base de données et variables"
translation_key: docs
category: app
description: >
  Documentation du système de stockage local de Bot Creator : AppManager
  (fichiers JSON), SqliteVariableStore (SQLite), gestion des bots, commandes,
  workflows, variables globales et scopées, TTL, migrations de schéma.
---

# Application — Stockage local : base de données et variables

Ce document couvre le système de stockage local de l'application **Bot Creator** : le singleton `AppManager` qui gère les fichiers JSON, et le `SqliteVariableStore` qui fournit une persistance SQLite pour les variables globales et scopées.

---

## AppManager — Singleton de stockage

Fichier : `packages/app/lib/core/storage/database.dart` (~2537 lignes)

`AppManager` est un **singleton** qui implémente l'interface `BotDataStore`. Il constitue la couche de persistance principale de l'application, responsable de la gestion de tous les bots, commandes, workflows, déclencheurs planifiés et webhooks entrants.

### Initialisation

```dart
AppManager._internal() {
  unawaited(_init());
}
```

À la création du singleton, `_init()` exécute les étapes suivantes :

1. **Résolution du répertoire de stockage** via `getAppStoragePath()` (délégué à `app_storage_directory.dart`).
2. **Création du dossier `apps/`** s'il n'existe pas.
3. **Initialisation de SQLite** : `SqliteVariableStore().init()`. En cas d'échec, un fallback JSON est activé (`_sqliteAvailable = false`).
4. **Chargement de la liste des bots** via `getAllApps()`.
5. **Lancement d'une boucle de diffusion** qui émet la liste des apps toutes les 2 secondes dans un `StreamController`.

### Structure des fichiers

Chaque bot est stocké sur disque selon l'arborescence suivante :

```
{appStoragePath}/
  apps/
    all_apps.json              # Index de tous les bots (id, name, avatar, guild_count)
    _deleted_bots.json         # Tombstone : bots supprimés après restauration
    {botId}.json               # Données principales du bot
    {botId}.payload.json       # Cache pré-calculé du payload (commandes + workflows)
    {botId}.command_stats.json # Statistiques d'exécution des commandes
    {botId}/
      {commandId}.json         # Fichier individuel par commande
    _debug/
      workflow_compat_report.json  # Rapport de compatibilité (debug Windows)
  databases/
    variables.db               # Base SQLite des variables (via SqliteVariableStore)
```

### Données stockées dans `{botId}.json`

Le fichier JSON de chaque bot contient les champs suivants :

| Champ | Type | Description |
|---|---|---|
| `name` | `String` | Nom d'utilisateur du bot |
| `id` | `String` | Snowflake Discord du bot |
| `avatar` | `String` | URL de l'avatar |
| `token` | `String` | Token Discord |
| `prefix` | `String` | Préfixe de commande (défaut: `!`) |
| `createdAt` | `String` | Date ISO 8601 de création |
| `intents` | `Map<String, bool>` | Intents Discord activés |
| `approximate_guild_count` | `int?` | Nombre approximatif de serveurs |
| `guild_count` | `int?` | Nombre de serveurs |
| `globalVariables` | `Map<String, dynamic>` | Variables globales (JSON) |
| `scopedVariables` | `Map<String, Map<String, Map<String, dynamic>>>` | Variables scopées (JSON) |
| `scopedVariableDefinitions` | `List<Map>` | Définitions des variables scopées |
| `workflows` | `List<Map>` | Workflows du bot |
| `scheduledTriggers` | `List<Map>` | Déclencheurs planifiés |
| `statuses` | `List<Map>` | Statuts du bot (legacy) |
| `activities` | `List<Map>` | Activités du bot |
| `inboundWebhooks` | `List<Map>` | Webhooks entrants |

### File d'écriture sérialisée

Pour éviter les corruptions de données en cas d'écritures concurrentes sur un même bot, `AppManager` maintient une **chaîne d'écritures** par bot (`_appWriteChains`).

```dart
Future<T> _enqueueAppWrite<T>(String id, Future<T> Function() action)
```

Chaque opération d'écriture est chaînée via `Future.then()` pour garantir la séquence. La méthode `flushPendingWrites()` attend la complétion de toutes les écritures en cours (utilisée avant les sauvegardes Google Drive).

### Opérations CRUD principales

#### Bots

| Méthode | Description |
|---|---|
| `createOrUpdateApp()` | Crée ou met à jour un bot. Fusionne les données existantes. |
| `getApp(id)` | Lit le fichier JSON du bot. |
| `saveApp(id, data)` | Écrit les données complètes du bot. |
| `deleteApp(id)` | Supprime le bot localement + enregistre un tombstone. |
| `deleteBotCompletely(id)` | Supprime du cloud API **puis** localement. |
| `reapDeletedBots()` | Ré-applique les suppressions enregistrées après une restauration. |
| `getAllApps()` | Retourne la liste de tous les bots depuis l'index. |
| `refreshApps()` | Recharge et diffuse la liste des bots. |

#### Commandes

| Méthode | Description |
|---|---|
| `listAppCommands(id)` | Liste les commandes depuis le cache ou le disque. |
| `getAppCommand(id, commandId)` | Lit une commande spécifique, normalise si nécessaire. |
| `saveAppCommand(id, commandId, data)` | Sauvegarde normalisée d'une commande. |
| `deleteAppCommand(id, commandId)` | Supprime une commande. |
| `deleteAppCommands(id)` | Supprime toutes les commandes d'un bot. |

#### Workflows

| Méthode | Description |
|---|---|
| `getWorkflows(id)` | Liste les workflows (avec cache payload). |
| `saveWorkflow(id, ...)` | Crée/met à jour un workflow avec normalisation. |
| `deleteWorkflow(id, name)` | Supprime un workflow. |

#### Déclencheurs planifiés

| Méthode | Description |
|---|---|
| `getScheduledTriggers(id)` | Liste les déclencheurs planifiés. |
| `saveScheduledTrigger(id, ...)` | Crée/met à jour un déclencheur (limité par Premium). |
| `deleteScheduledTrigger(id, triggerId)` | Supprime un déclencheur. |

#### Webhooks entrants

| Méthode | Description |
|---|---|
| `getInboundWebhooks(id)` | Liste les webhooks entrants. |
| `saveInboundWebhook(id, ...)` | Crée/met à jour un webhook (vérifie les conflits de chemin). |
| `deleteInboundWebhook(id, webhookId)` | Supprime un webhook. |

### Hooks post-sauvegarde

`AppManager` expose des **hooks statiques** optionnels appelés après chaque opération d'écriture :

```dart
static Future<void> Function(String botId)? onAfterSave;
static Future<void> Function(String, String, Map<String, dynamic>)? onAfterCommandSave;
static Future<void> Function(String, String)? onAfterCommandDelete;
static Future<void> Function(String, String, Map<String, dynamic>)? onAfterWorkflowSave;
static Future<void> Function(String, String)? onAfterWorkflowDelete;
static Future<void> Function(String, String, dynamic)? onAfterGlobalVariableSave;
static Future<void> Function(String, String)? onAfterGlobalVariableDelete;
static Future<void> Function(String, String, String)? onAfterGlobalVariableRename;
static Future<void> Function(String, String, String, dynamic, {String? valueType})? onAfterScopedVariableDefinitionSave;
static Future<void> Function(String, String, {String? scope, bool purgeStoredValues})? onAfterScopedVariableDefinitionDelete;
static Future<void> Function(String, String, Map<String, dynamic>)? onAfterScheduledTriggerSave;
static Future<void> Function(String, String)? onAfterScheduledTriggerDelete;
static Future<void> Function(String, String, Map<String, dynamic>)? onAfterInboundWebhookSave;
static Future<void> Function(String, String)? onAfterInboundWebhookDelete;
```

Ces hooks sont définis dans `main.dart` et permettent notamment de notifier le runner de recharger la configuration.

### Statistiques de commandes

`AppManager` maintient des statistiques d'exécution locales :

- `recordCommandExecution(botId, commandName)` : enregistre une exécution dans `command_stats.json`.
- `getLocalCommandStats(botId)` : retourne les statistiques agrégées (comptes par commande, timeline par heure, total all-time).
- Conservation : **50 000 entrées** maximum, purge automatique des entrées de plus de **30 jours**.

### Cache payload

Un cache `_payloadCache` (en mémoire et sur disque via `payload.json`) évite de reconstruire la charge utile complète (commandes + workflows) à chaque requête :

```dart
Future<Map<String, dynamic>?> getCachedPayload(String botId);
Future<void> saveCachedPayload(String botId, Map<String, dynamic> payload);
Future<void> invalidatePayloadCache(String botId);
```

Le cache est invalidé à chaque écriture.

---

## SqliteVariableStore — Base SQLite pour les variables

Fichier : `packages/app/lib/core/storage/sqlite_variable_store.dart` (~900 lignes)

`SqliteVariableStore` implémente l'interface `VariableDatabase` du package partagé `bot_creator_shared`. Il fournit un stockage **persistant et transactionnel** des variables globales et scopées via SQLite.

### Plateformes supportées

- **Windows, Linux** : nécessite `sqflite_common_ffi` avec initialisation explicite (`sqfliteFfiInit()`)
- **macOS, iOS, Android** : utilise `sqflite` standard
- **Web** : non supporté (détecté via `kIsWeb`)

### Schéma de la base

```sql
CREATE TABLE variables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bot_id TEXT NOT NULL,
  scope TEXT NOT NULL,
  context_id_1 TEXT NOT NULL,
  context_id_2 TEXT,
  key TEXT NOT NULL,
  value_raw TEXT NOT NULL,
  value_type TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  expires_at INTEGER,
  UNIQUE(bot_id, scope, context_id_1, context_id_2, key),
  CHECK(scope IN ('_global_', 'guild', 'user', 'channel', 'guildMember', 'message'))
);

CREATE INDEX idx_bot_lookup ON variables(bot_id, scope, context_id_1, context_id_2);
CREATE INDEX idx_scope_key_lookup ON variables(bot_id, scope, key);
```

### Scopes supportés

| Scope | Description | Format du `context_id` |
|---|---|---|
| `_global_` | Variables globales au bot | Chaîne vide |
| `guild` | Variables par serveur | ID du serveur |
| `user` | Variables par utilisateur | ID de l'utilisateur |
| `channel` | Variables par salon | ID du salon |
| `guildMember` | Variables par membre de serveur | `guildId:userId` |
| `message` | Variables par message | ID du message |

### Types de valeurs

La sérialisation utilise le couple `(value_raw, value_type)` :

| `value_type` | Format de `value_raw` |
|---|---|
| `number` | Représentation textuelle du nombre |
| `bool` | `"true"` ou `"false"` |
| `null` | `"null"` |
| `json` | Chaîne JSON (listes, maps) |
| `string` | Texte brut |

### Gestion du TTL

Chaque variable peut avoir une durée de vie (TTL) exprimée au format BDFD (ex: `5m`, `2h`, `1d`). Le champ `expires_at` stocke un timestamp Unix en millisecondes.

À la lecture, les variables expirées sont automatiquement exclues des résultats et supprimées.

### Migrations de schéma

Le schéma a évolué sur 5 versions :

| Version | Migration |
|---|---|
| v1 → v2 | Recréation de la table avec filtre sur les scopes valides |
| v2 → v3 | Ajout de l'index `idx_scope_key_lookup` |
| v3 → v4 | Ajout de la colonne `expires_at` |
| v4 → v5 | Nouvelle tentative d'ajout de `expires_at` (robustesse) |

### Opérations sur les variables globales

```dart
Future<Map<String, dynamic>> getGlobalVariables(String botId);
Future<dynamic> getGlobalVariable(String botId, String key);
Future<void> setGlobalVariable(String botId, String key, dynamic value, {String? ttl});
Future<void> renameGlobalVariable(String botId, String oldKey, String newKey);
Future<void> removeGlobalVariable(String botId, String key);
```

### Opérations sur les variables scopées

```dart
Future<Map<String, dynamic>> getScopedVariables(String botId, String scope, String contextId);
Future<dynamic> getScopedVariable(String botId, String scope, String contextId, String key);
Future<void> setScopedVariable(String botId, String scope, String contextId, String key, dynamic value, {String? ttl});
Future<int?> getScopedVariableTtl(String botId, String scope, String contextId, String key);
Future<void> renameScopedVariable(String botId, String scope, String contextId, String oldKey, String newKey);
Future<void> removeScopedVariable(String botId, String scope, String contextId, String key);
```

### Requêtes paginées et leaderboards

```dart
Future<Map<String, dynamic>> queryScopedVariableIndex(
  String botId, String scope, String key,
  {int offset = 0, int limit = 25, bool descending = true},
);
```

Retourne un résultat paginé (`items`, `count`, `total`) des valeurs d'une variable scopée à travers tous les contextes. Le tri est effectué par valeur (numérique, booléenne ou textuelle).

### Opérations sur les tableaux

`SqliteVariableStore` implémente des opérations atomiques sur les tableaux stockés comme variables scopées :

```dart
Future<void> pushScopedArrayElement(botId, scope, contextId, key, element);
Future<dynamic> popScopedArrayElement(botId, scope, contextId, key);
Future<dynamic> removeScopedArrayElement(botId, scope, contextId, key, int index);
Future<dynamic> getScopedArrayElement(botId, scope, contextId, key, int index);
Future<int> getScopedArrayLength(botId, scope, contextId, key);
Future<Map<String, dynamic>> queryScopedArray(botId, scope, contextId, key, {offset, limit, descending, filter});
```

### Filtres de requête

La méthode `queryScopedArray` supporte des filtres textuels :

| Syntaxe | Description |
|---|---|
| `> 100` | Supérieur à 100 (numérique) |
| `< 50` | Inférieur à 50 (numérique) |
| `>= 10` | Supérieur ou égal |
| `<= 20` | Inférieur ou égal |
| `== hello` | Égalité exacte |
| `contains abc` | Contient la sous-chaîne (insensible à la casse) |

### Fallback JSON

`AppManager` délègue les opérations sur les variables scopées à `SqliteVariableStore` lorsque `_sqliteAvailable == true`. En cas d'échec de l'initialisation SQLite, les variables sont stockées directement dans le fichier JSON du bot (`scopedVariables`). Les deux modes partagent la même interface, rendant le fallback transparent pour le reste de l'application.

### Nettoyage

```dart
Future<void> deleteAllForBot(String botId);  // Supprime toutes les variables d'un bot
Future<void> close();  // Ferme la connexion SQLite
```

---

## Définitions des variables scopées

Les **définitions** de variables scopées (`scopedVariableDefinitions`) sont stockées dans le JSON du bot (pas dans SQLite). Chaque définition contient :

```json
{
  "key": "score",
  "scope": "user",
  "defaultValue": 0,
  "valueType": "number"
}
```

Méthodes associées :

```dart
Future<List<Map<String, dynamic>>> getScopedVariableDefinitions(String botId);
Future<void> setScopedVariableDefinition(String botId, String key, String scope, dynamic defaultValue, {String valueType});
Future<void> removeScopedVariableDefinition(String botId, String key, {String? scope, bool purgeStoredValues});
```

L'option `purgeStoredValues` supprime toutes les valeurs stockées correspondant à cette définition (utile lors de la suppression d'une variable utilisée dans de nombreux contextes).

---

## Résumé du flux de stockage

```
┌─────────────────────────────────────────┐
│              AppManager                  │
│  (singleton, implémente BotDataStore)   │
├─────────────────────────────────────────┤
│  Fichiers JSON :                        │
│  • apps/{botId}.json (données du bot)   │
│  • apps/{botId}/{cmdId}.json (commandes)│
│  • apps/{botId}.payload.json (cache)    │
│  • apps/{botId}.command_stats.json      │
│  • apps/all_apps.json (index)           │
│  • apps/_deleted_bots.json (tombstone)  │
├─────────────────────────────────────────┤
│  SQLite (via SqliteVariableStore) :     │
│  • databases/variables.db               │
│  • variables globales + scopées         │
│  • TTL, pagination, filtres             │
├─────────────────────────────────────────┤
│  Fallback JSON si SQLite indisponible : │
│  • scopedVariables dans le bot JSON     │
│  • pas de TTL en mode JSON              │
└─────────────────────────────────────────┘
```
