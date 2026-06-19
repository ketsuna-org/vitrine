---
layout: doc
title: "Système — ComponentWorkflowBindings"
translation_key: docs
category: systems
description: >
  Documentation du module d'extraction et d'enregistrement des bindings
  workflow depuis les définitions de composants V2 (boutons, selects,
  modals) pour le routage des interactions utilisateur.
---

# Système — ComponentWorkflowBindings

Le module `ComponentWorkflowBindings` est responsable de l'extraction des actions inline depuis les définitions de composants V2 et de leur enregistrement dans le registre d'écouteurs d'interactions (`InteractionListenerRegistry`). Il est implémenté dans `packages/shared/lib/utils/component_workflow_bindings.dart` (108 lignes).

Ce module est utilisé lorsqu'un composant V2 (message avec boutons, selects, modals) est envoyé : il scanne récursivement l'arbre de composants pour détecter les nœuds interactifs portant des actions inline, puis les enregistre sous leur `customId` pour que le routeur d'interactions puisse les retrouver lors d'un clic utilisateur.

---

## Fonction exportée

### `registerComponentWorkflowBindings(...)`

Parse une définition de composant V2 et enregistre tous les écouteurs d'interactions trouvés.

```dart
void registerComponentWorkflowBindings({
  required ComponentV2Definition definition,
  required String Function(String) resolve,
  required String botId,
  String? guildId,
  String? channelId,
  String? messageId,
  Duration ttl = const Duration(hours: 24),
})
```

**Paramètres :**

| Paramètre    | Type                        | Description                                                        |
|-------------|-----------------------------|--------------------------------------------------------------------|
| `definition` | `ComponentV2Definition`     | Définition du composant V2 à parser                                |
| `resolve`    | `String Function(String)`   | Fonction de résolution des placeholders dans les `customId`        |
| `botId`      | `String`                    | Identifiant du bot propriétaire                                    |
| `guildId`    | `String?`                   | Identifiant de la guild (optionnel)                                |
| `channelId`  | `String?`                   | Identifiant du channel (optionnel)                                 |
| `messageId`  | `String?`                   | Identifiant du message (optionnel)                                 |
| `ttl`        | `Duration`                  | Durée de vie des entrées écouteur (défaut : 24 heures)             |

**Comportement :**

1. Calcule la date d'expiration (`DateTime.now().add(ttl)`).
2. Itère sur chaque nœud racine de `definition.components` et appelle `collectAndRegister`.
3. `collectAndRegister` visite récursivement l'arbre :

| Type de nœud     | Comportement                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `ButtonNode`     | Si le style n'est **pas** `link`, que `customId` est non vide, et que des actions sont présentes → enregistre un `ListenerEntry` de type `'button'` |
| `SelectMenuNode` | Si `customId` est non vide et des actions présentes → enregistre un `ListenerEntry` de type `'select'` |
| `ActionRowNode`  | Itère récursivement sur `node.components`                                   |
| `ContainerNode`  | Itère récursivement sur `node.components`                                   |
| `SectionNode`    | Itère sur `node.components` + visite `node.accessory` si présent            |
| `LabelNode`      | Visite `node.component` si présent                                          |

**Entrée enregistrée (`ListenerEntry`) :**

Chaque écouteur est créé avec les propriétés suivantes :

| Champ          | Valeur                                        |
|---------------|-----------------------------------------------|
| `botId`       | `botId` fourni                                |
| `customId`    | `customId` résolu (via `resolve`) et trimmé    |
| `inlineActions` | Liste d'`Action` parsées depuis `node.actions` |
| `expiresAt`   | Date d'expiration calculée                    |
| `type`        | `'button'` ou `'select'`                      |
| `oneShot`     | `false` (les composants sont réutilisables)    |
| `guildId`     | Optionnel                                     |
| `channelId`   | Optionnel                                     |
| `messageId`   | Optionnel                                     |

---

## Flux d'utilisation typique

```
Définition de composant V2 (message builder)
        │
        ▼
registerComponentWorkflowBindings(definition, ...)
        │
        ├── ButtonNode (style ≠ link, customId non vide, actions présentes)
        │     └── InteractionListenerRegistry.instance.register(customId, ListenerEntry(...))
        │
        ├── SelectMenuNode (customId non vide, actions présentes)
        │     └── InteractionListenerRegistry.instance.register(customId, ListenerEntry(...))
        │
        └── ContainerNode / ActionRowNode / SectionNode / LabelNode
              └── récursion vers les nœuds enfants
```

---

## Notes importantes

- Les boutons de style `link` sont ignorés (ils ne déclenchent pas d'interaction).
- Les composants sans actions inline sont ignorés (pas d'écouteur créé).
- Le `customId` est résolu via la fonction `resolve` avant enregistrement, permettant l'interpolation de placeholders (ex: variables utilisateur).
- La durée de vie par défaut est de 24 heures ; après expiration, l'écouteur n'est plus actif.
- Chaque enregistrement est loggé dans la console pour le débogage.
