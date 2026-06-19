---
layout: doc
title: "Système — InteractionAckState"
translation_key: docs
category: systems
description: >
  Documentation du module de suivi d'acquittement des interactions Discord.
  Utilise un Expando pour tracker en mémoire quelles interactions ont déjà
  reçu une réponse, et vérifie également les propriétés natives nyxx.
  Implémenté dans packages/shared/lib/utils/interaction_ack_state.dart (37 lignes).
---

# Système — InteractionAckState

Le module `InteractionAckState` est un utilitaire léger qui détermine si une interaction Discord a déjà reçu une réponse (acquittée). Il combine un suivi mémoire via `Expando` avec la vérification des propriétés natives fournies par la bibliothèque nyxx. Il est implémenté dans `packages/shared/lib/utils/interaction_ack_state.dart` (37 lignes).

Ce module est critique pour éviter les erreurs `40060` (« Interaction has already been acknowledged ») lors de l'envoi de réponses multiples à une même interaction.

---

## État interne

### `_ackState`

```dart
final _ackState = Expando<bool>();
```

Un `Expando<bool>` qui associe un booléen à chaque instance d'`Interaction`. Contrairement à une `Map`, un `Expando` ne retient pas la référence de la clé — lorsque l'objet `Interaction` est garbage-collecté, l'entrée disparaît automatiquement. Cela évite les fuites mémoire.

---

## Fonctions exportées

### `isInteractionAcknowledged(interaction)`

Vérifie si une interaction a déjà été acquittée (a reçu une réponse).

```dart
bool isInteractionAcknowledged(Interaction interaction)
```

**Paramètre :**

| Paramètre     | Type          | Description                   |
|---------------|---------------|-------------------------------|
| `interaction` | `Interaction` | L'interaction Discord à tester |

**Retour :** `true` si l'interaction est déjà acquittée, `false` sinon.

**Sources vérifiées (dans l'ordre) :**

| # | Source                      | Méthode d'accès                                  | Description                                              |
|---|-----------------------------|--------------------------------------------------|----------------------------------------------------------|
| 1 | `_ackState[interaction]`    | Expando local                                    | Marqué explicitement par `markInteractionAcknowledged`   |
| 2 | `interaction.isAcknowledged`| `(interaction as dynamic).isAcknowledged`        | Propriété native nyxx (try/catch)                        |
| 3 | `interaction.acknowledged`  | `(interaction as dynamic).acknowledged`          | Variante de propriété native (try/catch)                 |
| 4 | `interaction.hasResponded`  | `(interaction as dynamic).hasResponded`          | Propriété native nyxx (try/catch)                        |

L'accès aux propriétés natives (2-4) se fait via `dynamic` avec `try/catch` pour éviter les erreurs si la propriété n'existe pas sur le type concret d'interaction.

---

### `markInteractionAcknowledged(interaction)`

Marque explicitement une interaction comme acquittée dans l'Expando local.

```dart
void markInteractionAcknowledged(Interaction interaction)
```

**Paramètre :**

| Paramètre     | Type          | Description                        |
|---------------|---------------|------------------------------------|
| `interaction` | `Interaction` | L'interaction Discord à marquer    |

**Utilisation :** Appelé après chaque envoi réussi de réponse (`respond`, `respondModal`, `updateOriginalResponse`) dans `sendWorkflowResponse` et `respondToModal`.

---

## Flux d'utilisation

```
Envoi d'une réponse
        │
        ▼
isInteractionAcknowledged(interaction)
        │
        ├── true → editOrRespond (édition/followup)
        │
        └── false → respond (nouvelle réponse)
                │
                ▼
        markInteractionAcknowledged(interaction)
```

---

## Pourquoi un Expando ?

1. **Pas de fuite mémoire** : Les entrées sont automatiquement supprimées quand l'`Interaction` est garbage-collectée.
2. **Pas de clé de hachage requise** : L'identité de l'objet suffit, pas besoin d'extraire un ID.
3. **Léger** : Aucune surcharge de gestion de cycle de vie manuelle.

Le choix d'un `Expando` plutôt qu'une `Map<Interaction, bool>` est donc pertinent pour un cycle de vie court (une interaction ne vit que le temps du traitement).

---

## Dépendances

- `package:nyxx/nyxx.dart` : type `Interaction`
- Aucune autre dépendance interne
