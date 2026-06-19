---
layout: doc
title: "App — Système d'abonnements Premium"
translation_key: docs
category: app
description: >
  Documentation du système d'abonnements Premium de l'application Flutter Bot Creator :
  gestion des achats in-app (Google Play / App Store), statut premium, feature gating,
  synchronisation backend, diagnostics et cycle de vie des abonnements.
---

# App — Système d'abonnements Premium

Le système **Premium** gère les abonnements payants de Bot Creator, le feature gating des fonctionnalités avancées et la synchronisation du statut premium entre le device et le backend manager.

## Fichiers source

```
packages/app/lib/features/subscriptions/
├── logic/
│   ├── subscription_service.dart    — Gestion des abonnements (1022 lignes)
│   └── premium_capabilities.dart    — Définition des features premium-gated (166 lignes)
└── presentation/
    └── subscription_page.dart       — Page UI d'abonnement
```

---

## Architecture globale

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       SYSTÈME PREMIUM                                     │
│                                                                           │
│  ┌──────────────────────────────┐  ┌──────────────────────────────────┐ │
│  │    SubscriptionService       │  │    PremiumCapabilities           │ │
│  │                              │  │                                  │ │
│  │ • In-App Purchase (mobile)   │  │ • 9 fonctionnalités premium      │ │
│  │ • Google Play / App Store    │  │ • Feature gating (hasCapability) │ │
│  │ • Desktop premium par défaut │  │ • Rollout flags                  │ │
│  │ • Sync backend (best-effort) │  │ • Limites par feature            │ │
│  │ • Cache SharedPreferences    │  │ • Debug bypass                   │ │
│  │ • Timer d'expiration         │  │                                  │ │
│  │ • Restauration d'achats      │  │                                  │ │
│  └──────────────┬───────────────┘  └──────────────┬───────────────────┘ │
│                 │                                  │                      │
│                 └──────────────┬───────────────────┘                      │
│                                │                                          │
│                    ┌───────────▼───────────┐                              │
│                    │   Sources de vérité    │                              │
│                    │                        │                              │
│                    │ 1. Billing natif (IAP) │                              │
│                    │ 2. Manager backend     │                              │
│                    │ 3. Cache local (SP)    │                              │
│                    └────────────────────────┘                              │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## SubscriptionService — Gestion des abonnements

Fichier : `subscription_service.dart`

`SubscriptionService` est une classe statique qui gère l'intégralité du cycle de vie des abonnements : achat, vérification, expiration, restauration et synchronisation backend.

### Identifiants de produits

| Constante | Identifiant |
|-----------|-------------|
| `kMonthlySubscriptionId` | `bot_creator_premium_monthly` |
| `kAnnualSubscriptionId` | `bot_creator_premium_annual` |

Ces identifiants doivent correspondre exactement à ceux configurés dans Google Play Console et App Store Connect.

### État interne

| Propriété | Type | Description |
|-----------|------|-------------|
| `_isSubscribed` | `bool` | Statut d'abonnement local |
| `_activeProductId` | `String?` | Identifiant du produit actif |
| `_subscriptionExpiresAt` | `DateTime?` | Date d'expiration estimée |
| `products` | `List<ProductDetails>` | Produits disponibles dans le store |
| `_managerPremiumOverride` | `bool?` | Override du backend manager |
| `_storeAvailable` | `bool` | Disponibilité du store IAP |

### Détermination du statut Premium

La propriété `isSubscribed` est le point d'entrée pour connaître le statut premium. Sa logique varie selon la plateforme :

```
┌─────────────────────────────────────────────────────────────┐
│                  isSubscribed — Logique                      │
│                                                              │
│  Desktop (Windows/macOS/Linux) ?                            │
│    └─ OUI → true (premium par défaut)                       │
│                                                              │
│  Billing natif source de vérité ?                           │
│    └─ OUI → _isLocalSubscriptionActive()                    │
│                                                              │
│  Override manager frais (< 20s TTL) ?                       │
│    └─ OUI → _managerPremiumOverride                         │
│                                                              │
│  Fallback → _isLocalSubscriptionActive()                    │
└─────────────────────────────────────────────────────────────┘
```

**Règle importante** : sur desktop (Windows, Linux, macOS), l'utilisateur est **toujours considéré premium**. Aucune vérification IAP n'est effectuée.

### Supports techniques

| Propriété | Description |
|-----------|-------------|
| `_isSupportedPlatform` | `true` si Android ou iOS (hors Web) |
| `_isDesktop` | `true` si Windows, macOS ou Linux |
| `_usesNativeBillingSourceOfTruth` | `true` si plateforme supportée ET pas d'override debug |

---

### Cycle de vie d'un abonnement

```
┌──────────┐    ┌──────────────┐    ┌─────────────┐    ┌───────────┐
│ ACHAT    │───▶│ VÉRIFICATION │───▶│ ACTIVATION   │───▶│ ACTIF     │
│ (purchase│    │ (_verifyAnd  │    │ (prefs +     │    │ (timer    │
│ Monthly/ │    │  Deliver)    │    │  expiry)     │    │  expiry)  │
│  Annual) │    │              │    │              │    │           │
└──────────┘    └──────────────┘    └─────────────┘    └─────┬─────┘
                                                              │
                                              ┌───────────────▼───────────┐
                                              │ EXPIRATION                 │
                                              │                            │
                                              │ • Timer d'expiration       │
                                              │ • Restauration (app resume)│
                                              │ • _markExpired()           │
                                              └────────────────────────────┘
```

### Initialisation

```dart
static Future<void> initialize() async {
  // 1. Chargement du cache SharedPreferences (immédiat, pas d'attente réseau)
  // 2. Vérification expiration — si expiré → _markExpired()
  // 3. Planification du timer d'expiration (_scheduleExpirationTimer)
  // 4. Vérification disponibilité du store IAP
  // 5. Souscription au flux d'achats (purchaseStream)
  // 6. Requête des produits disponibles (queryProductDetails)
  // 7. Restauration des achats précédents (obligatoire Apple)
  // 8. Observation du cycle de vie applicatif (WidgetsBindingObserver)
}
```

Points clés :
- Le cache `SharedPreferences` est lu **immédiatement** pour un rendu UI sans latence
- La restauration des achats est obligatoire selon les guidelines Apple
- Un `WidgetsBindingObserver` force une vérification du statut à chaque reprise de l'application

### Persistance

| Clé SharedPreferences | Type | Description |
|------------------------|------|-------------|
| `subscription_active` | `bool` | Abonnement actif ou non |
| `subscription_product_id` | `String` | Identifiant du produit |
| `subscription_expires_at` | `String` | Date d'expiration ISO 8601 |

---

### Flux d'achat

```
┌─────────────────────────────────────────────────────────────────────┐
│                        purchaseMonthly() / purchaseAnnual()          │
│                                                                      │
│  1. Vérification disponibilité du store                              │
│     └─ Store indisponible → SubscriptionPurchaseResult.failed()     │
│                                                                      │
│  2. Recherche du produit dans le catalogue local                      │
│     └─ Absent → re-query store, nouvelle tentative                   │
│     └─ Toujours absent → failed(productUnavailable)                  │
│                                                                      │
│  3. Android uniquement : pré-check Play Billing                      │
│     └─ isFeatureSupported(subscriptions) → failed si non supporté   │
│                                                                      │
│  4. Lancement de l'achat natif                                       │
│     └─ iap.buyNonConsumable(purchaseParam)                           │
│     └─ Échec → failed(purchaseStartFailed)                           │
│                                                                      │
│  5. Succès → le flux purchaseStream déclenche _handlePurchaseUpdates │
└─────────────────────────────────────────────────────────────────────┘
```

### Résultat de tentative d'achat

```dart
enum SubscriptionPurchaseFailureReason {
  storeUnavailable,      // Store IAP non disponible
  productUnavailable,    // Produit introuvable dans le catalogue
  purchaseStartFailed,   // Échec au lancement de l'achat
}
```

La classe `SubscriptionPurchaseResult` encapsule le résultat :
- `SubscriptionPurchaseResult.started()` — achat lancé avec succès
- `SubscriptionPurchaseResult.failed(reason)` — échec avec raison

---

### Gestion des mises à jour d'achat

```dart
static Future<void> _handlePurchaseUpdates(
  List<PurchaseDetails> purchaseDetailsList,
) async {
  for (final purchase in purchaseDetailsList) {
    switch (purchase.status) {
      case PurchaseStatus.purchased:
      case PurchaseStatus.restored:
        await _verifyAndDeliver(purchase);  // Activation
      case PurchaseStatus.error:
        // Loggué dans AppDiagnostics
      case PurchaseStatus.canceled:
      case PurchaseStatus.pending:
        // Pas d'action
    }
    if (purchase.pendingCompletePurchase) {
      await InAppPurchase.instance.completePurchase(purchase);
    }
  }
}
```

### Vérification et livraison

`_verifyAndDeliver()` effectue les actions suivantes :

1. Active l'abonnement localement (`_isSubscribed = true`)
2. Persiste dans `SharedPreferences`
3. Estime la date d'expiration selon le type d'abonnement :
   - **Mensuel** : +1 mois calendaire
   - **Annuel** : +12 mois calendaires
4. Planifie le timer d'expiration
5. Tente la synchronisation backend (best-effort)

### Estimation d'expiration

```dart
static DateTime? _estimateSubscriptionExpiry({
  required String productId,
  required DateTime startedAt,
}) {
  if (productId.contains('annual') || productId.contains('year'))
    return _addCalendarMonths(subscriptionStart, 12);
  if (productId.contains('monthly') || productId.contains('month'))
    return _addCalendarMonths(subscriptionStart, 1);
  return null;  // Durée inconnue → pas d'expiration estimée
}
```

L'estimation utilise des mois **calendaires** (et non 30 jours), ce qui évite les dérives sur l'année.

---

### Synchronisation backend

La méthode `syncStatusWithBackend()` synchronise le statut d'abonnement avec le backend manager :

- **Throttling** : maximum une synchronisation toutes les 24 heures (sauf `force: true`)
- **Fonctionnement** : déclenche `restorePurchases()` qui alimente le `purchaseStream`, lequel appelle `_syncBillingEntitlement()`
- `_syncBillingEntitlement()` envoie les données de vérification au serveur :
  - **iOS** : `transactionId`
  - **Android** : `purchaseToken`
- La synchronisation est **best-effort** : les échecs réseau ne changent jamais le statut premium local

### Refresh du statut manager

`resolveEffectivePremiumStatus()` détermine le statut premium effectif :

1. **Desktop** : toujours `true`
2. **Billing natif** : valide localement via `refreshStatus()` (TTL 6h)
3. **Session manager valide** : interroge l'API manager (`getGatewayRuntime()`) qui devient la source de vérité
   - Override avec TTL de 20 secondes
   - Si le manager indique `FREE`, l'abonnement local est révoqué (`_markExpired()`)
   - Sur échec réseau, fallback au statut local

---

### Publicités récompensées

`canSkipRewardedAds()` est une variante **plus stricte** de la vérification premium, utilisée avant le démarrage d'un bot pour décider si une pub récompensée peut être évitée :

- Nécessite soit un **billing natif vérifié**, soit une **session manager valide**
- Timeout intégré via `canSkipRewardedAdsWithTimeout()` (4 secondes par défaut)
- Sur desktop, retourne toujours `true`

---

### Cycle de vie applicatif

```dart
class _SubscriptionLifecycleObserver extends WidgetsBindingObserver {
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      // Vérification du statut à chaque reprise de l'application
      SubscriptionService.refreshStatus();
      SubscriptionService.resolveEffectivePremiumStatus(forceRefresh: true);
    }
  }
}
```

---

### Support test

Le service expose plusieurs méthodes `@visibleForTesting` :

| Méthode | Description |
|---------|-------------|
| `debugResetForTests()` | Réinitialise tout l'état |
| `debugSetLocalSubscriptionForTests()` | Injecte un abonnement simulé |
| `debugSetNativeBillingSourceOfTruth()` | Force le mode billing natif |
| `debugEstimateSubscriptionExpiryForTests()` | Teste l'estimation d'expiration |

---

## PremiumCapabilities — Feature Gating

Fichier : `premium_capabilities.dart`

### Fonctionnalités premium

```dart
enum PremiumCapability {
  noAds,                  // Pas de publicités
  instantStart,           // Démarrage instantané (sans pub récompensée)
  analyticsExpanded,      // Analytiques étendues
  schedulerTriggers,      // Déclencheurs planifiés
  inboundWebhooks,        // Webhooks entrants
  visualDebuggerReplay,   // Replay du debugger visuel
  autoSharding,           // Auto-sharding Discord
  autoRestart,            // Redémarrage automatique après changement de config
  lavalinkAudio,          // Audio Lavalink (musique)
}
```

### Définitions des features

Chaque feature est définie via `PremiumFeatureDefinition` :

| Champ | Type | Description |
|-------|------|-------------|
| `capability` | `PremiumCapability` | Identifiant de la fonctionnalité |
| `icon` | `IconData` | Icône Material |
| `title` | `Function(AppLocalizations)` | Titre localisé |
| `description` | `Function(AppLocalizations)` | Description localisée |
| `coreBenefit` | `bool` | Mis en avant dans la liste d'abonnement |

Les **core benefits** (toujours visibles) sont :
- `noAds` — Suppression des publicités
- `instantStart` — Démarrage instantané des bots

### Feature Gating

```dart
static bool hasCapability(PremiumCapability capability) {
  if (capability == PremiumCapability.noAds ||
      capability == PremiumCapability.instantStart) {
    return isPremiumUser;
  }
  return isPremiumUser && isCapabilityRolledOut(capability);
}
```

Pour `noAds` et `instantStart`, le simple fait d'être premium suffit. Pour les autres features, le rollout flag doit également être activé.

### Détermination du statut premium utilisateur

```dart
static bool get isPremiumUser =>
  (kDebugMode && debugPremiumBypass) || SubscriptionService.isSubscribed;
```

- En **mode debug**, `debugPremiumBypass` peut être activé manuellement pour tester toutes les features
- En **production**, le statut dépend de `SubscriptionService.isSubscribed`

### Rollout flags

```dart
static const Map<PremiumCapability, bool> _rolloutEnabled = {
  PremiumCapability.noAds: true,
  PremiumCapability.instantStart: true,
  // ... toutes les features sont actuellement activées
};
```

Ce mécanisme permet de désactiver une feature sans déploiement d'urgence, utile pour le roadmap ou en cas de bug bloquant.

### Limites par feature

```dart
static int limitFor(PremiumCapability capability) {
  switch (capability) {
    case PremiumCapability.noAds:
    case PremiumCapability.instantStart:
      return isPremiumUser ? 1 : 0;
    case PremiumCapability.schedulerTriggers:
      return isPremiumUser ? 10 : 0;       // 10 déclencheurs max
    case PremiumCapability.inboundWebhooks:
      return isPremiumUser ? 5 : 0;        // 5 webhooks max
    // ... les autres features : 1 (booléen) ou 0
  }
}
```

Les features comme `schedulerTriggers` (10 max) et `inboundWebhooks` (5 max) ont des quotas, les autres sont binaires (activé/désactivé).

---

## Intégration dans l'application

### Vérification d'accès à une feature

```dart
if (PremiumCapabilities.hasCapability(PremiumCapability.schedulerTriggers)) {
  // Afficher l'UI des déclencheurs planifiés
} else {
  // Afficher le paywall ou une version limitée
}
```

### Affichage de la page d'abonnement

```dart
static bool get canShowPurchaseUI =>
  SubscriptionService.supportsNativeBilling && !isPremiumUser;
```

La page d'abonnement n'est affichable que sur mobile (Android/iOS) et si l'utilisateur n'est pas déjà premium.

### Démarrage d'un achat

```dart
final result = await SubscriptionService.purchaseMonthly();
if (result.started) {
  // L'achat est en cours, le flux purchaseStream notifiera le résultat
} else {
  // Gérer l'erreur : result.failureReason
}
```

---

## Flux de données utilisateur

```
┌──────────┐     ┌─────────────────┐     ┌──────────────────┐
│  Device  │────▶│ Google Play /   │────▶│  Backend Manager  │
│  (IAP)   │     │ App Store       │     │  (best-effort)    │
│          │     │                 │     │                   │
│  Cache   │     │ Vérification    │     │ • verifyBilling   │
│  local   │     │ du reçu         │     │ • Statut plan     │
│  (SP)    │     │                 │     │ • Sync owner      │
└──────────┘     └─────────────────┘     └──────────────────┘
```

**Règle de sécurité** : le backend n'est **jamais** la source unique de vérité pour l'accès premium local. Le billing natif du store (Google Play / App Store) est l'autorité finale. La synchronisation backend est strictement best-effort et ne peut pas révoquer un abonnement valide localement.
