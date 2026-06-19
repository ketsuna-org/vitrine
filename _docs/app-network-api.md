---
layout: doc
title: "App — Couche réseau : Main API"
translation_key: docs
category: app
description: >
  Documentation de la couche réseau Main API de l'application Flutter Bot Creator :
  client HTTP, authentification Discord OAuth, gestion de session JWT,
  configuration et synchronisation du propriétaire avec le cloud.
---

# App — Couche réseau : Main API

La couche **Main API** gère toutes les communications entre l'application Flutter Bot Creator et le backend **bot-creator-manager**. Elle est responsable de l'authentification, de la gestion des bots (CRUD), de la synchronisation de configuration, des commandes, workflows, variables, et des opérations liées au marketplace.

## Fichiers source

```
packages/app/lib/core/network/
├── main_api_client.dart        — Client HTTP principal (1563 lignes)
├── main_api_auth_service.dart  — Service d'authentification OAuth Discord (302 lignes)
├── main_api_settings.dart      — Configuration, session et stockage (190 lignes)
└── main_api_owner_sync.dart    — Résolution du propriétaire et synchronisation cloud (216 lignes)
```

---

## Architecture globale

```
┌──────────────────────────────────────────────────────────────────────┐
│                        COUCHE MAIN API                                │
│                                                                       │
│  ┌─────────────────────┐  ┌────────────────────────────────────────┐ │
│  │ MainApiAuthService  │  │         MainApiClient                   │ │
│  │                     │  │                                         │ │
│  │ • OAuth Discord     │  │  ┌──────────────────────────────────┐  │ │
│  │   (desktop/mobile)  │  │  │  Implémente RemoteRuntimeClient  │  │ │
│  │ • Échange de tokens │  │  │                                    │  │ │
│  │ • Refresh session   │  │  │  • Circuit breaker                │  │ │
│  └─────────┬───────────┘  │  │  • Retry logic (3 tentatives)     │  │ │
│            │              │  │  • Cache de health (TTL 30s)      │  │ │
│            ▼              │  │  • Cache de hash de sync          │  │ │
│  ┌─────────────────────┐  │  │  • Refresh auto du token         │  │ │
│  │ MainApiSettingsStore│  │  └──────────────────────────────────┘  │ │
│  │                     │  │                                         │ │
│  │ • MainApiConfig     │  │  Endpoints :                           │ │
│  │   (URL, timeouts)   │  │  /gateway/bots/*     — CRUD bots       │ │
│  │ • MainApiSession    │  │  /auth/*              — Auth            │ │
│  │   (JWT, expiry)     │  │  /billing/*           — Facturation     │ │
│  │ • SharedPreferences │  │  /marketplace/*       — Templates       │ │
│  └─────────────────────┘  │  /storage/*           — Upload fichier  │ │
│                            └────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                MainApiOwnerSyncHelper                             │ │
│  │                                                                   │ │
│  │ • resolveOwnerContext()    — Résout le propriétaire d'un bot      │ │
│  │ • resolveMainApiClientForBot() — Client authentifié par bot       │ │
│  │ • restoreMainApiSessionWithBotToken() — Restauration session      │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

---

## `MainApiClient` — Client HTTP principal

**Classe** : `MainApiClient` (implémente `RemoteRuntimeClient`)  
**Source runtime** : `RemoteRuntimeSource.manager`

Le `MainApiClient` est le client HTTP responsable de toutes les communications avec le backend **Bot Creator Manager**. Il est construit avec une URL de base, un token d'accès optionnel, et un client HTTP injectable.

### Constructeur

```dart
MainApiClient({
  required String baseUrl,
  String? accessToken,
  http.Client? httpClient,
  Duration? timeout,  // défaut : 30 secondes
})
```

L'URL de base est normalisée via `MainApiConfig.normalizeBaseUrl()` (suppression des slashes finaux).

### Mécanismes de résilience

#### Circuit Breaker

Un **circuit breaker** par URL de base empêche les appels en cascade vers une API défaillante :

| Paramètre | Valeur |
|-----------|--------|
| Seuil d'échecs (`_circuitMaxFailures`) | 3 |
| Cooldown (`_circuitCooldown`) | 60 secondes |
| État | Suivi dans `_circuits` (Map statique) |

Lorsque le circuit est ouvert, toute requête lève immédiatement une `MainApiClientException` sans tenter d'appel réseau.

#### Retry Logic

Chaque requête HTTP (`GET`, `POST`, `PUT`, `DELETE`) bénéficie d'une logique de retry avec backoff exponentiel :

| Paramètre | Valeur |
|-----------|--------|
| Tentatives max (`_maxRetries`) | 3 |
| Délai initial (`_baseRetryDelay`) | 1 seconde |
| Multiplicateur (`_retryBackoffMultiplier`) | 2× |
| Délais effectifs | 1s → 2s → 4s |

Les erreurs **client** (4xx sauf 429) ne sont **pas** retentées. Les erreurs **serveur** (5xx) et les erreurs réseau le sont.

#### Refresh automatique du token

Lorsqu'une requête authentifiée reçoit un **401** ou **403**, le client tente automatiquement de rafraîchir la session via `_tryRefreshSession()` :

1. Charge la session stockée (`MainApiSettingsStore.loadSession()`)
2. Extrait le `refreshToken`
3. Appelle `refreshSession()` sur un client public (sans auth)
4. Sauvegarde la nouvelle session
5. Réessaie la requête originale avec le nouveau token

Si le refresh échoue avec un 401/403, la session est effacée (`MainApiSettingsStore.clearSession()`).

#### Cache de health check

Les résultats de `checkHealth()` sont mis en cache avec un **TTL de 30 secondes** pour éviter les pings excessifs.

### Méthodes HTTP internes

Toutes les méthodes publiques passent par les méthodes privées `_get()`, `_post()`, `_put()`, `_delete()` qui :

1. Vérifient le circuit breaker
2. Loguent la requête (debug)
3. Exécutent la requête avec retry
4. Parsent la réponse JSON
5. Gèrent les erreurs 4xx/5xx

Deux méthodes spéciales existent pour la rétro-compatibilité des routes API :

- **`_getFirstAvailable(paths)`** : essaie plusieurs chemins GET jusqu'à en trouver un qui ne retourne pas 404
- **`_postFirstAvailable(paths, body)`** : idem pour POST

### Authentification

#### OAuth Discord (flux)

L'authentification se fait exclusivement via Discord OAuth. Le flux est orchestré par `MainApiAuthService` mais les appels API sont sur `MainApiClient` :

```dart
// Étape 1 : Démarrer l'autorisation
Future<MainApiAuthorizationStart> startDiscordAuthorization({
  required String redirectUri,
  required String state,
})
// → POST /auth/discord/start
// Retourne l'URL d'autorisation Discord

// Étape 2 : Compléter l'échange
Future<MainApiSession> completeDiscordAuthorization({
  required String code,
  required String state,
  required String redirectUri,
})
// → POST /auth/discord/exchange
// Retourne une MainApiSession (JWT + refresh token)

// Échange par token de bot Discord
Future<MainApiSession> exchangeDiscordBotToken({
  required String botToken,
})
// → POST /auth/discord/bot/exchange
// Permet de récupérer une session à partir d'un token de bot

// Rafraîchissement de session
Future<MainApiSession> refreshSession({
  required String refreshToken,
})
// → POST /auth/refresh
```

#### Utilisateur courant

```dart
Future<Map<String, dynamic>> getCurrentUser()
// → GET /auth/me (fallback → /gateway/runtime)
```

### Endpoints de gestion des bots

#### CRUD

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `listBots()` | `GET /gateway/bots` | Liste les bots de l'utilisateur |
| `deleteBot(botId)` | `DELETE /gateway/bots/{botId}` | Supprime un bot |
| `getStatus(botId?)` | `GET /gateway/runtime` ou `/gateway/bots/{botId}/runtime` | Statut d'exécution |
| `getMetrics(botId?)` | `GET /gateway/metrics` ou `/gateway/bots/{botId}/metrics` | Métriques runtime |
| `getBotRuntime(botId)` | `GET /gateway/bots/{botId}/runtime` | Runtime d'un bot spécifique |
| `getGatewayRuntime()` | `GET /gateway/runtime` | État global du gateway |
| `getRunnerInfo()` | `GET /gateway/runner` | Infos du runner manager |

#### Gestion du cycle de vie

```dart
// Démarrage
Future<void> startBot(String botId, {String? botName})
// → POST /gateway/bots/{botId}/start

// Arrêt
Future<Map<String, dynamic>> stopBot(String botId)
// → POST /gateway/bots/{botId}/stop (fallback /bots/{botId}/stop)
```

#### Synchronisation de configuration

La synchronisation utilise un mécanisme d'**URL présignée** pour uploader la configuration :

```dart
Future<void> syncBot(String botId, String botName, Map<String, dynamic> config, {bool force = false})
```

**Workflow** :
1. **Hash check** : si le hash de la config correspond au dernier hash synchronisé, skip (sauf si `force`)
2. **Presign** : `presignBotConfig()` → `POST /gateway/bots/presign-config` → obtient `uploadUrl` et `configUrl`
3. **Upload** : `uploadFileToPresignedUrl()` → PUT du JSON sur l'URL présignée (R2)
4. **Sync** : `POST /gateway/bots/sync` avec `configUrl`
5. **Fallback** : si l'upload présigné échoue, envoi direct du JSON dans le corps (`POST /gateway/bots/sync` avec `config`)
6. Mise à jour du cache de hash

```dart
// Rechargement à chaud (traité comme un sync)
Future<void> reloadBot(String botId, String botName, Map<String, dynamic> configJson, {bool force = false})

// Snapshot Discord (sauvegarde cloud automatique)
Future<void> saveDiscordBotSnapshot({required String botToken, required Map<String, dynamic> config, bool force = false})
```

#### Gestion des commandes et workflows

| Méthode | Endpoint |
|---------|----------|
| `syncCommand(botId, botName, commandId, commandJson)` | `POST /gateway/bots/{botId}/commands/sync` |
| `deleteCommand(botId, botName, commandId)` | `POST /gateway/bots/{botId}/commands/delete` |
| `syncWorkflow(botId, botName, workflowName, workflowJson)` | `POST /gateway/bots/{botId}/workflows/sync` |
| `deleteWorkflow(botId, botName, workflowName)` | `POST /gateway/bots/{botId}/workflows/delete` |

#### Variables

| Méthode | Endpoint |
|---------|----------|
| `getGlobalVariables(botId)` | `GET /gateway/bots/{botId}/variables/global` |
| `setGlobalVariable(botId, key, value)` | `POST /gateway/bots/{botId}/variables/global/set` |
| `removeGlobalVariable(botId, key)` | `POST /gateway/bots/{botId}/variables/global/remove` |
| `renameGlobalVariable(botId, oldKey, newKey)` | `POST /gateway/bots/{botId}/variables/global/rename` |
| `getScopedVariableDefinitions(botId)` | `GET /gateway/bots/{botId}/variables/scoped-definitions` |
| `setScopedVariableDefinition(...)` | `POST /gateway/bots/{botId}/variables/scoped-definitions/set` |
| `removeScopedVariableDefinition(...)` | `POST /gateway/bots/{botId}/variables/scoped-definitions/remove` |
| `listScopedValuesForKey(botId, scope, key)` | `GET /gateway/bots/{botId}/variables/scoped-values` |

#### Déclencheurs et Webhooks

| Méthode | Endpoint |
|---------|----------|
| `syncScheduledTrigger(botId, triggerId, triggerJson)` | `POST /gateway/bots/{botId}/triggers/scheduled/sync` |
| `deleteScheduledTrigger(botId, triggerId)` | `POST /gateway/bots/{botId}/triggers/scheduled/delete` |
| `syncInboundWebhook(botId, webhookId, webhookJson)` | `POST /gateway/bots/{botId}/triggers/webhooks/sync` |
| `deleteInboundWebhook(botId, webhookId)` | `POST /gateway/bots/{botId}/triggers/webhooks/delete` |

### Logs et statistiques

```dart
Future<List<String>> getLogs({String? botId, int limit = 300})
// → GET /gateway/logs (ou /gateway/bots/{botId}/logs)

Future<Map<String, dynamic>> getCommandStats(String botId, {int hours = 24})
// → GET /gateway/bots/{botId}/command-stats
```

### Gestion des versions de configuration

```dart
// Récupérer la config complète d'un bot (depuis R2)
Future<Map<String, dynamic>> getBotConfig(String botId)
// → GET /gateway/bots/{botId}/config → puis download depuis l'URL R2

// Lister les versions disponibles
Future<List<Map<String, dynamic>>> getBotConfigVersions(String botId)
// → GET /gateway/bots/{botId}/versions

// Restaurer une version précédente
Future<bool> restoreBotConfigVersion(String botId, String versionKey)
// → POST /gateway/bots/{botId}/versions/restore

// Récupérer le contenu d'une version spécifique
Future<Map<String, dynamic>> getBotConfigVersion(String botId, String versionKey)
// → GET /gateway/bots/{botId}/versions/config?key={versionKey}
```

### Marketplace

| Méthode | Endpoint |
|---------|----------|
| `listMarketplaceTemplates()` | `GET /marketplace` |
| `getMarketplaceTemplate(id)` | `GET /marketplace/{id}` |
| `createMarketplaceTemplate(template)` | `POST /marketplace` |
| `updateMarketplaceTemplate(id, template)` | `PUT /marketplace/{id}` |
| `deleteMarketplaceTemplate(id)` | `DELETE /marketplace/{id}` |
| `applyMarketplaceTemplate(templateId, botId, variables)` | `POST /marketplace/{templateId}/apply` |
| `rateMarketplaceTemplate(templateId, rating)` | `POST /marketplace/{templateId}/rate` |

### Billing et publicités

```dart
// Vérification d'achat (server-side)
Future<Map<String, dynamic>> verifyBilling({
  required String platform,
  required String serverVerificationData,
  required String productId,
  String? localTransactionId,
})
// → POST /billing/verify

// Claim de récompense publicitaire
Future<Map<String, dynamic>> claimBotAdRuntime({
  required String botId,
  required String placement,
  required String rewardId,
  required String idempotencyKey,
  required DateTime occurredAt,
})
// → POST /gateway/bots/{botId}/runtime/claim-ad
```

### Presigned URLs

```dart
// Présignature pour la config d'un bot
Future<PresignBotConfigResponse> presignBotConfig({String? botId})
// → POST /gateway/bots/presign-config

// Présignature pour l'upload de fichier générique
Future<PresignUploadFileResponse> presignUploadFile({
  required String filename,
  required String contentType,
  required int sizeBytes,
})
// → POST /storage/presign

// Upload vers une URL présignée
Future<void> uploadFileToPresignedUrl({
  required String uploadUrl,
  required List<int> fileBytes,
  required String contentType,
})
// → PUT direct vers l'URL (R2)
```

### Hash cache

Le client maintient deux caches de hash pour éviter les synchronisations inutiles :

| Cache | Clé | Persistance |
|-------|-----|-------------|
| `_lastSyncedHashes` | `{baseUrl}:{botId}` | SharedPreferences (`main_api_last_synced_hashes`) |
| `_lastSavedSnapshots` | `{baseUrl}:snapshot:{botToken}` | SharedPreferences (`main_api_last_saved_snapshots`) |

Taille max : 100 entrées par cache, avec éviction LRU automatique.

---

## `MainApiAuthService` — Service d'authentification OAuth

**Classe** : `MainApiAuthService` (constructeur privé, méthodes statiques)

Gère le flux OAuth2 complet avec Discord, avec deux implémentations distinctes selon la plateforme.

### Point d'entrée

```dart
static Future<MainApiSession> connectWithDiscord({
  required MainApiClient client,
  Duration timeout = const Duration(minutes: 5),
})
```

La méthode détecte automatiquement la plateforme :
- **Desktop** (Linux, macOS, Windows) → flux avec serveur HTTP local (loopback)
- **Mobile** (Android, iOS) → flux avec App Links / custom scheme
- **Web** → non supporté (mobile uniquement)

### Flux Desktop (`_connectDesktop`)

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  App Flutter │     │ Main API     │     │  Discord     │     │ localhost    │
│              │     │              │     │  OAuth       │     │ :35641       │
└──────┬───────┘     └──────┬───────┘     └──────┬──────┘     └──────┬───────┘
       │                    │                    │                   │
       │ 1. Bind localhost  │                    │                   │
       │────────────────────────────────────────────────────────────▶│
       │                    │                    │                   │
       │ 2. POST /auth/discord/start             │                   │
       │───────────────────▶│                    │                   │
       │                    │                    │                   │
       │ 3. authorizeUrl + state                 │                   │
       │◀───────────────────│                    │                   │
       │                    │                    │                   │
       │ 4. Ouvre le navigateur système          │                   │
       │────────────────────────────────────────▶│                   │
       │                    │                    │                   │
       │                    │   5. Autorisation   │                   │
       │                    │◀───────────────────│                   │
       │                    │                    │                   │
       │                    │   6. Redirect       │                   │
       │                    │────────────────────│──────────────────▶│
       │                    │                    │                   │
       │ 7. Callback HTTP (code + state)                              │
       │◀─────────────────────────────────────────────────────────────│
       │                    │                    │                   │
       │ 8. POST /auth/discord/exchange          │                   │
       │───────────────────▶│                    │                   │
       │                    │                    │                   │
       │ 9. MainApiSession (JWT)                 │                   │
       │◀───────────────────│                    │                   │
```

- Port du serveur callback : **35641**
- URL de redirection : `http://localhost:35641/oauth/main-api/discord`
- Timeout par défaut : 5 minutes
- Génération d'un `state` aléatoire (24 caractères) pour la protection CSRF

### Flux Mobile (`_connectMobile`)

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  App Flutter │     │ Main API     │     │  Discord     │     │ App Links    │
│              │     │              │     │  OAuth       │     │              │
└──────┬───────┘     └──────┬───────┘     └──────┬──────┘     └──────┬───────┘
       │                    │                    │                   │
       │ 1. POST /auth/discord/start             │                   │
       │───────────────────▶│                    │                   │
       │                    │                    │                   │
       │ 2. authorizeUrl + state                 │                   │
       │◀───────────────────│                    │                   │
       │                    │                    │                   │
       │ 3. Écoute AppLinks stream + ouvre navigateur               │
       │────────────────────────────────────────▶│                   │
       │                    │                    │                   │
       │                    │   4. Autorisation   │                   │
       │                    │◀───────────────────│                   │
       │                    │                    │                   │
       │                    │   5. Redirect       │                   │
       │                    │────────────────────│──────────────────▶│
       │                    │                    │                   │
       │ 6. AppLinks callback (URI)                                   │
       │◀─────────────────────────────────────────────────────────────│
       │                    │                    │                   │
       │ 7. POST /auth/discord/exchange          │                   │
       │───────────────────▶│                    │                   │
       │                    │                    │                   │
       │ 8. MainApiSession (JWT)                 │                   │
       │◀───────────────────│                    │                   │
```

Deux formats de callback sont acceptés :
- **Universal Link** : `https://bot-creator.fr/oauth/main-api/discord`
- **Custom Scheme** : `botcreator://oauth/main-api/discord`

Le flux gère aussi le cas où le callback arrive comme lien initial (`getInitialLink()`) plutôt que via le stream.

### Validation CSRF

Le `state` est vérifié côté client pour prévenir les attaques CSRF. Le serveur peut soit retourner son propre `state`, soit le client utilise celui qu'il a généré.

### Génération de state

```dart
static String _generateState(int length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~';
  final random = Random.secure();
  return List.generate(length, (_) => chars[random.nextInt(chars.length)]).join();
}
```

---

## `MainApiSettings` — Configuration et session

### `MainApiConfig`

Configuration de connexion au Main API.

```dart
class MainApiConfig {
  final String baseUrl;

  bool get isConfigured => baseUrl.trim().isNotEmpty;

  static String normalizeBaseUrl(String raw) {
    // Supprime les slashes finaux
  }
}
```

**URL par défaut** :
- Mode debug : `https://dev.bot-creator.fr`
- Mode release : `https://api.bot-creator.fr`

### `MainApiSession`

Représente une session authentifiée (JWT).

```dart
class MainApiSession {
  final String accessToken;       // JWT
  final DateTime expiresAt;       // Date d'expiration UTC
  final String? refreshToken;     // Token de rafraîchissement
  final String? userId;           // ID de l'utilisateur
  final String? username;         // Nom d'utilisateur
  final List<String> scopes;      // Scopes OAuth

  bool get isExpired => expiresAt.isBefore(DateTime.now().toUtc());

  bool expiresSoon({Duration threshold = const Duration(minutes: 2)}) {
    return expiresAt.isBefore(DateTime.now().toUtc().add(threshold));
  }
}
```

La session supporte la sérialisation JSON pour le stockage persistant.

### `MainApiSettingsStore`

Stockage persistant de la configuration et de la session via `SharedPreferences`.

| Méthode | Description |
|---------|-------------|
| `loadConfig()` | Charge la config (fallback : URL par défaut) |
| `saveConfig(config)` | Sauvegarde la config |
| `clearConfig()` | Efface la config |
| `loadSession()` | Charge la session (vérifie accessToken + expiresAt) |
| `saveSession(session)` | Sauvegarde la session |
| `clearSession()` | Efface la session |
| `clearAll()` | Efface config + session |

**Clés SharedPreferences** :
- `main_api_config` → JSON de `MainApiConfig`
- `main_api_session` → JSON de `MainApiSession`

---

## `MainApiOwnerSyncHelper` — Résolution du propriétaire

**Classe** : `MainApiOwnerSyncHelper`

Ce helper résout le **contexte propriétaire** d'un bot et construit un `MainApiClient` authentifié approprié. Il est utilisé lors de la synchronisation cloud pour déterminer quel compte utiliser pour interroger les bots.

### `MainApiOwnerResolution`

Résultat de la résolution du propriétaire :

```dart
class MainApiOwnerResolution {
  final List<String> ownerCandidates;   // IDs propriétaires candidats
  final String? preferredOwnerId;       // ID préféré (premier de la liste)
  final String source;                  // 'manager_payload' ou 'none'

  bool get hasOwner => ownerCandidates.isNotEmpty;
}
```

### `resolveOwnerFromManagerBotPayload(bot)`

Extrait les IDs propriétaires d'un payload de bot manager en cherchant dans plusieurs champs :

```
team.owner_user_id → team.ownerUserId → bot.owner_id → bot.ownerId → owner.id → owner.owner_id
```

### `resolveOwnerContext(botId, managerBotPayload, botToken)`

1. Tente de résoudre le propriétaire depuis le payload manager
2. Si trouvé, retourne immédiatement
3. Sinon, retourne une résolution vide (`source: 'none'`)

### `resolveMainApiClientForBot(botId, botToken, attemptSessionRestore)`

Construit un `MainApiClient` authentifié pour un bot spécifique :

```
1. Charge la config MainApi
2. Vérifie si une session existe et n'est pas expirée
3. Si expirée avec refresh token → tente un refresh
4. Si session valide → retourne un client avec accessToken
5. Sinon, tente restoreMainApiSessionWithBotToken()
6. Si tout échoue → retourne null
```

### `restoreMainApiSessionWithBotToken(botId, botToken)`

Restaure une session à partir d'un token de bot Discord :

1. Charge la config MainApi
2. Crée un client public
3. Appelle `exchangeDiscordBotToken(botToken)`
4. Sauvegarde la session obtenue

---

## Gestion des erreurs

### `MainApiClientException`

```dart
class MainApiClientException implements Exception {
  final String message;
  final int? statusCode;
}
```

Le message d'erreur est extrait de la réponse JSON (champs `error`, `message`, ou `reasonPhrase`).

### Classification des erreurs

| Type | Code HTTP | Comportement |
|------|-----------|--------------|
| Non trouvé | 404 | Fallback vers route alternative (`_getFirstAvailable`) |
| Erreur client | 4xx (sauf 429) | Pas de retry |
| Erreur serveur | 5xx | Retry avec backoff |
| Erreur réseau | Timeout, connexion | Retry avec backoff |

---

## Résumé des responsabilités

| Composant | Responsabilité |
|-----------|---------------|
| `MainApiClient` | Client HTTP avec circuit breaker, retry, refresh token, hash cache |
| `MainApiAuthService` | Flux OAuth Discord desktop et mobile |
| `MainApiConfig` | Configuration de l'URL du backend |
| `MainApiSession` | Session JWT avec expiration et refresh token |
| `MainApiSettingsStore` | Persistance config + session (SharedPreferences) |
| `MainApiOwnerSyncHelper` | Résolution du propriétaire et construction de client par bot |
| `MainApiOwnerResolution` | Résultat de résolution (candidats, préféré, source) |
| `PresignBotConfigResponse` | Réponse de présignature (botId, configUrl, uploadUrl) |
| `PresignUploadFileResponse` | Réponse de présignature de fichier (fileId, objectKey, uploadUrl) |
