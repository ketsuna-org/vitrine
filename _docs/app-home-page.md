---
layout: doc
title: "App — Page d'accueil (Dashboard)"
translation_key: docs
category: app
description: >
  Documentation de la page d'accueil (HomePage) de l'application Flutter Bot Creator.
  Couvre le layout responsive, les cartes de bots, la synchronisation cloud, le statut
  du runner, le premium gating et les publicités.
---

# App — Page d'accueil (Dashboard)

La **HomePage** est l'écran principal de l'application Flutter Bot Creator. Elle affiche la liste des bots Discord de l'utilisateur sous forme de cartes, gère leur démarrage/arrêt, la synchronisation avec le cloud, et intègre des fonctionnalités de monétisation (publicités, premium). Elle est implémentée dans `home_page.dart` (2490 lignes).

## Fichier source

```
packages/app/lib/features/home/presentation/home_page.dart
```

**Classe principale** : `HomePage` (StatefulWidget) → `HomePageState` (avec `TickerProviderStateMixin`, `WidgetsBindingObserver`).

---

## Architecture générale

```
┌──────────────────────────────────────────────────────────────────────┐
│                        HOMEPAGE DASHBOARD                             │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  LayoutBuilder → responsive grid                                │ │
│  │                                                                  │ │
│  │  StreamBuilder<List<dynamic>> ← appManager.getAppStream()       │ │
│  │       │                                                          │ │
│  │       ├── Empty state (_EmptyStateWithSupport)                   │ │
│  │       └── Column                                                 │ │
│  │            ├── NativeAdSlot (bannière pub optionnelle)           │ │
│  │            └── RefreshIndicator                                 │ │
│  │                 └── SingleChildScrollView                       │ │
│  │                      └── Wrap (grille responsive)               │ │
│  │                           ├── BotCard 1                          │ │
│  │                           ├── BotCard 2                          │ │
│  │                           └── BotCard N                          │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  États : Empty / Loading / Error / Bots list                         │
│  Rafraîchissement : Pull-to-refresh → syncAllBotsFromManager()       │
│  Timer interne : refresh du statut toutes les 15 secondes            │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Layout responsive

Le layout s'adapte à la largeur d'écran via un `LayoutBuilder` :

| Largeur          | Colonnes | Contexte               |
|------------------|----------|------------------------|
| < 480px          | 1        | Téléphone              |
| 480 – 599px      | 2        | Mobile large           |
| 600 – 759px      | 2        | Petite tablette        |
| 760 – 899px      | 3        | Tablette moyenne       |
| 900 – 1199px     | 3        | Tablette / petit desktop |
| 1200 – 1499px    | 4        | Desktop large          |
| ≥ 1500px         | 5        | Desktop extra-large    |

- **iOS** : une colonne forcée si largeur < 600px (`useIOSPhoneLayout`).
- Chaque carte a une largeur calculée : `(contentWidth - ((cols - 1) * 12)) / cols`.
- Espacement entre les cartes : 14px (horizontal et vertical via `Wrap`).

---

## Cartes de bots (`_BotCard`)

Chaque bot est rendu par le widget privé `_BotCard` (StatelessWidget).

### Contenu d'une carte

```
┌──────────────────────────────────────┐
│                         [ONLINE ●]    │  ← Statut badge (pulsé si actif)
│                                      │
│            ┌──────────┐              │
│            │  Avatar   │              │  ← CircleAvatar avec glow vert
│            └──────────┘              │     si le bot tourne
│                                      │
│           Nom du bot                 │  ← Text (bold, 13-16px)
│          👥 42 serveurs               │  ← Server count (icon + texte)
│       [Serveurs Bot Creator]          │  ← Badge runtime (mode compact caché)
│      Hébergement: 2 j, 5 h           │  ← Hosting time restant (couleur codée)
│                                      │
│  ┌────────────────────────────────┐  │
│  │      ▶ DÉMARRER               │  │  ← Bouton principal Start/Stop
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │      ⏱ AJOUTER DU TEMPS       │  │  ← Bouton "Add time" (si running,
│  └────────────────────────────────┘  │     non premium, onAddTime dispo)
│                                      │
│  ┌─────────────┐  ┌───────────────┐  │
│  │  ⚙ GÉRER    │  │  📄 Logs     │  │  ← Gérer + Logs (row)
│  └─────────────┘  └───────────────┘  │
└──────────────────────────────────────┘
```

### Détails des composants

| Élément | Description |
|---------|-------------|
| **Avatar** | `CircleAvatar` avec image réseau (avatar Discord). Fallback : icône `smart_toy`. Si le bot tourne : ombre portée verte (`BoxShadow` avec `successAccent`). |
| **Statut badge** | Pill rectangulaire en haut à droite. Point vert (`successAccent`) si online, gris si offline. Animation pulse via `AnimationController` (repeat reverse, 900ms) quand le bot tourne. Texte "En ligne" / "Hors ligne". |
| **Server count** | Icône `groups_rounded` + texte formaté (ex: "42 serveurs"). |
| **Runtime badge** | Affiché seulement si le bot tourne et pas en mode compact. Label dépend de la source : `"Serveurs Bot Creator"` (manager), `"Runner: <nom>"` (runner personnalisé). Icône `dns_outlined`. |
| **Hosting time** | Affiché seulement si l'utilisateur n'est pas premium ET que `freeMinutes` est non nul. Formaté en mois → jours → heures → minutes. Couleur dynamique : rouge si < 1 jour, orange si < 3 jours, vert sinon. |
| **Bouton Démarrer/Arrêter** | `FilledButton.icon`. Change de label selon le contexte : "Démarrer" (normal), "Démarrer (Premium)" (premium), "Démarrer (pub)" (free, 0 minutes), "Arrêter" (running). Fond vert (`AppTheme.success`) pour start, semi-transparent pour stop. Affiche un `CircularProgressIndicator` pendant l'action. |
| **Bouton Ajouter du temps** | Visible uniquement si le bot tourne ET non premium ET `onAddTime` disponible (mobile). Déclenche `_addHostingTime()` → pub récompensée. |
| **Bouton Gérer** | Navigation vers `AppEditPage` (éditeur BDFD). Retour → `_initRunningState()`. |
| **Bouton Logs** | Navigation vers `BotLogsPage`. Désactivé (grisé) si le bot ne tourne pas. |

### Gradient de fond

- **Online** : `AppTheme.botCardOnlineGradient` (teintes vertes/bleutées).
- **Offline** : `AppTheme.botCardOfflineGradient` (teintes sombres/grises).
- Élévation de la carte : 8 (online) vs 3 (offline).

---

## Gestion des bots

### Cycle de vie

```
initState()
  ├── warmUpFuture (attente du warm-up)
  ├── _initRunningState()     → détection immédiate de l'état
  └── syncAllBotsFromManager(silent: true) → sync complète en arrière-plan

Timer 15s → _initRunningState() (si mounted)

didChangeAppLifecycleState(resumed)
  ├── _initRunningState()
  └── syncAllBotsFromManager(silent: true)
```

### Détection de l'état running (`_initRunningState`)

La méthode détermine quels bots sont en cours d'exécution en interrogeant plusieurs sources :

1. **In-app (local)** : vérifie `isMobileBotRunning(botId)` (mobile) ou `desktopRunningBotIds` (desktop).
2. **Main API (manager)** : résout le client manager, appelle `getStatus(botId:)`.
3. **Runner personnalisé** : résout via `_resolveRemoteRuntime()`, vérifie si le runner est associé.
4. **Fallback local** : si aucune source distante, utilise `FlutterForegroundTask` (mobile) ou `desktopRunningBotIds`.

À la fin, met à jour `_runningBotIds`, `_runtimeSource`, `_runtimeDetailLabel`, synchronise les animations pulse et la présence Discord RPC.

### Démarrage / Arrêt (`_toggleBot`)

```
_toggleBot(botId, botName)
  │
  ├── Si START :
  │   ├── Fetch + validate token Discord
  │   ├── Sync config depuis le Manager (pre-launch)
  │   ├── Vérification token (getDiscordUser, dialogue si invalide)
  │   ├── _maybeOfferRewardedAd() → pub récompensée (mobile non-premium)
  │   │
  │   ├── Runner API (si client distant dispo) :
  │   │   ├── buildBotPayload(botId)
  │   │   ├── saveDiscordBotSnapshot (MainApiClient)
  │   │   ├── syncBot → startBot / startManagerBotWithCreditRetry
  │   │   └── RunnerSettings.associateBotWithRunner
  │   │
  │   └── Local engine (fallback) :
  │       ├── Mobile : initForegroundService → startMobileBotSession
  │       └── Desktop : startDesktopBot
  │
  ├── Si STOP :
  │   ├── Runner API : client.stopBot(botId)
  │   ├── Mobile : stopMobileBotSession(botId)
  │   └── Desktop : stopDesktopBot(botId)
  │
  └── finally : _syncPulse, _syncDiscordRpcPresence
```

### Suppression d'un bot (`_deleteBot`)

Affiche un dialogue de confirmation, puis supprime le bot de l'`appManager`. Si le bot tourne, il est d'abord arrêté.

### Démarrage/arrêt en masse

- `_startAllLocalBots()` : démarre tous les bots configurés localement.
- `_stopAllBots()` : arrête tous les bots en cours d'exécution.

---

## Synchronisation Cloud

### Push to Cloud (`_pushToRemote`)

Force l'envoi de la configuration locale vers le Main API. Appelé manuellement depuis l'interface. Utilise `buildBotPayload(botId)` pour construire le payload, puis `client.syncBot()`.

### Pull from Cloud (`syncAllBotsFromManager`)

Appelé automatiquement à l'initialisation et lors du pull-to-refresh. **Note : le Pull from Cloud dédié par bot n'est pas implémenté** (les clés i18n `bot_home_pull` et `bot_home_pull_success` existent mais aucune UI ne les utilise).

**Fonctionnement de `syncAllBotsFromManager(silent:)`** :

1. **Résolution du client manager** : tente de restaurer une session globale, sinon essaie les tokens locaux.
2. **Fallback direct Discord** : si aucun client manager, interroge l'API Discord directement pour chaque bot local (username, avatar, guild count) et met à jour via `appManager.createOrUpdateApp()`.
3. **Sync managée** (3 phases) :
   - **Phase 1** : Collecte les clients owner uniques (déduplication par `ownerKey`).
   - **Phase 2** : Appelle `listBots()` en parallèle pour chaque owner.
   - **Phase 3** : Pour chaque bot, récupère les métadonnées (guild count, avatar), sauvegarde le snapshot, et met à jour la base locale via `createOrUpdateApp()`.
4. Après la sync, déclenche `_initRunningState()` pour rafraîchir le statut.

### Dernière synchronisation

La date/heure de la dernière synchronisation est affichée dans l'interface (gérée via `_lastSyncTime` ou équivalent).

---

## Runner Status

L'application supporte trois sources de runtime pour l'exécution des bots :

| Source | Description | Badge |
|--------|-------------|-------|
| **Manager** (`RemoteRuntimeSource.manager`) | Serveurs Bot Creator (Main API). Runtime géré. | "Serveurs Bot Creator" |
| **Runner** (`RemoteRuntimeSource.runner`) | Runner personnalisé auto-hébergé. | "Runner: <nom>" ou "Runner" |
| **Local** (`RemoteRuntimeSource.local`) | Exécution locale sur l'appareil (mobile/desktop). | Pas de badge |

### Informations affichées

Quand un runner est connecté, l'interface affiche :
- **Statut** : connecté / déconnecté
- **Adresse IP** du runner
- **Uptime** (durée de fonctionnement)
- **Version** du runner
- **Bouton Connect/Disconnect**

### Rafraîchissement du statut runner

La méthode `_refreshRunnerStatus()` effectue un ping vers le runner pour vérifier sa disponibilité. Le résultat est reflété dans l'interface utilisateur.

### Résolution du runtime (`_resolveRemoteRuntime`)

Délégue à `resolveRemoteRuntime()` avec les paramètres :
- `supportsManagerRuntime` : true si plateforme mobile (pas web ni desktop)
- `botId` : optionnel, pour la résolution par bot
- Timeouts : GET 30s, POST 90s

---

## Premium Gating

### Mécanisme

Le premium gating repose sur `SubscriptionService` :
- `SubscriptionService.isSubscribed` : indique si l'utilisateur a un abonnement actif.
- `SubscriptionService.resolveEffectivePremiumStatus()` : résout le statut premium effectif (appelé à l'init et après une pub récompensée).
- `SubscriptionService.canSkipRewardedAdsWithTimeout()` : vérifie si l'utilisateur peut ignorer les pubs (timeout 4s).

### Éléments conditionnés au premium

| Feature | Condition | Comportement non-premium |
|---------|-----------|--------------------------|
| **Bouton Démarrer** | Si premium → "Démarrer (Premium)" | Si 0 minutes → "Démarrer (pub)" ; sinon "Démarrer" |
| **Bouton Ajouter du temps** | Affiché seulement si non-premium et onAddTime dispo | Propose une pub récompensée pour gagner du temps |
| **Hosting time** | Affiché seulement si non-premium | Affiche le temps restant avec code couleur d'urgence |
| **Bannière premium** | Si non-premium | Message "Disponible avec Bot Creator PREMIUM" |
| **Bouton "Voir les offres"** | Si non-premium | Navigation vers `subscription_page` |

### Labels contextuels du bouton Start

| Contexte | Label |
|----------|-------|
| Desktop (pas de premium labels) | `bot_home_start` ("Démarrer") |
| Premium actif | `home_start_premium` ("Démarrer (Premium)") |
| Free avec minutes > 0 | `bot_home_start` ("Démarrer") |
| Free avec 0 minutes | `home_start_ads` ("Démarrer (pub)") |

---

## Publicités (Ads)

### NativeAdSlot

Une bannière publicitaire native est affichée en haut de la liste des bots, sous conditions :
- Placement activé via `AdsPlacementPolicy.isPlacementEnabled(NativeAdPlacement.homeBots)`
- Nombre de bots ≥ `AdsPlacementPolicy.listInterval`

Le widget utilisé est `NativeAdSlot` (hauteur 118px, marge inférieure 12px).

### Pub récompensée (`_maybeOfferRewardedAd`)

Les pubs récompensées sont proposées aux utilisateurs non-premium sur mobile (`_supportsForegroundTask`) avant de démarrer un bot ou d'ajouter du temps d'hébergement.

**Workflow complet** :

```
_maybeOfferRewardedAd(botId, botToken, force, successMessage)
  │
  ├── 1. Vérification premium → skip si premium
  ├── 2. Vérification freeMinutes > 0 → skip si pas forcé
  ├── 3. Vérification disponibilité de la pub
  │     └── AdRewardService.ensureAdLoaded(timeout: 4s)
  ├── 4. Vérification cooldown/limite
  │     └── AdRewardService.shouldOfferRewardedAd()
  ├── 5. Consentement GDPR (AdConsentService)
  ├── 6. Synchronisation snapshot bot (saveDiscordBotSnapshot)
  ├── 7. Contexte SSV (Server-Side Verification)
  │     └── AdRewardSsvContext (owner_id, bot_id, placement)
  ├── 8. Affichage de la pub
  │     └── AdRewardService.showRewardedAd(ssvContext, onRewardEarned)
  ├── 9. Attente du crédit (polling balance, timeout 12s)
  │     └── _waitForMainApiRewardCredit()
  └── 10. Rafraîchissement du statut premium
        └── SubscriptionService.resolveEffectivePremiumStatus(forceRefresh: true)
```

### Services publicitaires utilisés

| Service | Rôle |
|---------|------|
| `AdRewardService` | Gestion des pubs récompensées (chargement, éligibilité, affichage) |
| `AdConsentService` | Gestion du consentement GDPR/ATT |
| `AdsPlacementPolicy` | Politique de placement des bannières natives |

---

## Fonctions utilitaires

### `_formatHostingDuration(context, totalMinutes)`

Formate une durée en minutes vers un affichage lisible :
- Mois (30 jours), jours, heures, minutes
- Exemple : `1234 min` → `"1 mois, 10 jours, 4 heures, 3 minutes"`
- Zéro → `"0 minute"`
- Concaténation avec `", "`

### `_hostingTimeColor(context, minutes)`

Retourne une couleur selon l'urgence du temps restant :
- **Rouge** (`AppTheme.error`) : moins de 1 jour (1440 min)
- **Orange** (`AppTheme.warning`) : entre 1 et 3 jours (1440–4320 min)
- **Vert** (`AppTheme.successAccent`) : plus de 3 jours

---

## Discord RPC

La présence Discord Rich Presence est synchronisée automatiquement via `_syncDiscordRpcPresence()` :
- Appelée après chaque changement d'état de bot (démarrage/arrêt).
- Appelée après `_initRunningState()`.
- Utilise `DiscordRpcService.instance.syncBotRuntimeState()` avec :
  - Liste des bots running
  - Noms des bots
  - Source du runtime
  - Bot préféré (dernier manipulé)

---

## Debug Replay

Un panneau de debug est disponible (en mode développement) :
- **Toggle** pour activer/désactiver le replay.
- **Liste** des replays enregistrés.
- **Bouton Clear** pour vider les replays.

---

## États et erreurs

### États de chargement

- **Empty** : widget `_EmptyStateWithSupport` — icône robot, message "Aucun bot", lien Discord d'aide.
- **Loading** : géré par le `StreamBuilder` — affiche l'état initial (liste vide).
- **Error** : `snapshot.hasError` → `Center(child: Text(app_loading_error))`.

### Gestion des erreurs

- **Erreur de token** : dialogue de confirmation avant de continuer (`bot_home_token_invalid_title`).
- **Erreur de connexion manager** : message demandant de se connecter dans les paramètres.
- **Erreur d'exécution** : SnackBar avec `error_with_details`.
- **Erreur de sync** : SnackBar avec `home_sync_failed`.
- **Erreur de pub** : SnackBar selon le contexte (pas de pub dispo, cooldown, consentement refusé).

---

## Métriques et analytics

- `AppAnalytics.logScreenView(screenName: 'HomePage', screenClass: 'HomePage')` à l'init.
- `AppAnalytics.logEvent(name: 'home_page_opened')` à l'init.
- Logs de debug détaillés via `appendBotDebugLog()` (préfixés `[BOT_DEBUG]`).

---

## Résumé des méthodes principales de `HomePageState`

| Méthode | Description |
|---------|-------------|
| `_initRunningState()` | Détecte l'état d'exécution de tous les bots |
| `syncAllBotsFromManager(silent:)` | Synchronise les bots avec le cloud (manager ou fallback Discord) |
| `_toggleBot(botId, botName)` | Démarre ou arrête un bot (runner distant ou local) |
| `_addHostingTime(botId)` | Ajoute du temps d'hébergement via pub récompensée |
| `_deleteBot(botId)` | Supprime un bot après confirmation |
| `_pushToRemote(botId)` | Force le push de la configuration vers le Main API |
| `_saveAppMetadata()` | Sauvegarde les métadonnées de l'application |
| `_refreshRunnerStatus()` | Ping le runner pour vérifier sa disponibilité |
| `_startAllLocalBots()` | Démarre tous les bots configurés localement |
| `_stopAllBots()` | Arrête tous les bots en cours d'exécution |
| `_maybeOfferRewardedAd()` | Propose une pub récompensée (mobile non-premium) |
| `_formatHostingDuration()` | Formate une durée en minutes (mois/jours/heures/min) |
| `_hostingTimeColor()` | Couleur selon l'urgence du temps restant |
| `triggerRefresh()` | Déclenche le pull-to-refresh programmatiquement |
