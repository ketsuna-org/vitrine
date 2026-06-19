---
layout: doc
title: "Système — CommandAutocomplete"
translation_key: docs
category: systems
description: >
  Documentation du module d'autocomplétion des commandes slash Discord.
  Support par type d'option, normalisation des configurations d'autocomplétion
  (statique, inline, workflow), et résolution de la configuration active
  à partir de l'option focalisée dans l'interaction.
---

# Système — CommandAutocomplete

Le module `CommandAutocomplete` gère la configuration et la résolution de l'autocomplétion pour les options de commandes slash Discord. Il est implémenté dans `packages/shared/lib/utils/command_autocomplete.dart` (213 lignes).

---

## Fonctions exportées

### `commandOptionSupportsAutocomplete(type)`

Détermine si un type d'option Discord supporte l'autocomplétion.

```dart
bool commandOptionSupportsAutocomplete(CommandOptionType type)
```

**Types supportés :**

| Type               | Supporté |
|--------------------|----------|
| `string`           | ✅ Oui   |
| `integer`          | ✅ Oui   |
| `number`           | ✅ Oui   |
| Tous les autres    | ❌ Non   |

Les types non supportés incluent : `subCommand`, `subCommandGroup`, `boolean`, `user`, `channel`, `role`, `mentionable`, `attachment`.

---

### `commandOptionTypeToText(type)`

Convertit un `CommandOptionType` en chaîne de caractères lowercase.

```dart
String commandOptionTypeToText(CommandOptionType type)
```

**Mapping complet :**

| `CommandOptionType`  | Résultat          |
|----------------------|-------------------|
| `subCommand`         | `"subCommand"`    |
| `subCommandGroup`    | `"subCommandGroup"`|
| `string`             | `"string"`        |
| `integer`            | `"integer"`       |
| `boolean`            | `"boolean"`       |
| `user`               | `"user"`          |
| `channel`            | `"channel"`       |
| `role`               | `"role"`          |
| `mentionable`        | `"mentionable"`   |
| `number`             | `"number"`        |
| `attachment`         | `"attachment"`    |
| *fallback*           | `"string"`        |

---

### `normalizeSerializedAutocompleteConfig(raw)`

Parse et normalise une configuration d'autocomplétion brute (issue de la sérialisation JSON) en un `Map<String, dynamic>` structuré, ou `null` si la configuration est vide ou invalide.

```dart
Map<String, dynamic>? normalizeSerializedAutocompleteConfig(dynamic raw)
```

**Étapes de normalisation :**

#### 1. Validation initiale
- Si `raw` n'est pas un `Map` → retourne `null`.

#### 2. Extraction des champs

| Champ            | Extraction                                | Valeur par défaut |
|------------------|-------------------------------------------|-------------------|
| `mode`           | `source['mode']` → trim                   | `"workflow"`      |
| `workflow`       | `source['workflow']` → trim               | `""`              |
| `entryPoint`     | `source['entryPoint']` → trim             | `"main"`          |
| `arguments`      | `source['arguments']` si `Map`            | `{}`              |
| `staticChoices`  | `source['staticChoices']` si `List`       | `[]`              |
| `inlineActions`  | `source['inlineActions']` si `List`       | `[]`              |

#### 3. Modes d'autocomplétion

| Valeur brute   | Mode normalisé  |
|----------------|-----------------|
| `"static"`     | `"static"`      |
| `"inline"`     | `"inline"`      |
| Autre          | `"workflow"`    |

#### 4. Parsing des arguments

Si `source['arguments']` est un `Map` :
- Convertit toutes les clés en `String` via `.toString()`.
- Ignore les clés vides après trim.
- Conserve les valeurs telles quelles.

#### 5. Parsing des choix statiques (`staticChoices`)

Si `source['staticChoices']` est une `List` :
- Filtre uniquement les éléments de type `Map`.
- Convertit chaque entrée en `Map<String, dynamic>` avec clés en `String`.

#### 6. Parsing des actions inline (`inlineActions`)

Si `source['inlineActions']` est une `List` :
- Même logique que pour `staticChoices`.
- Convertit chaque action en `Map<String, dynamic>`.

#### 7. Détection de l'état `enabled`

L'autocomplétion est considérée comme activée si :
- `source['enabled'] == true` **OU**
- `source['enabled']` est absent (`null`) et au moins un contenu est présent :
  - `workflow` non vide
  - `arguments` non vide
  - `staticChoices` non vide
  - `inlineActions` non vide

#### 8. Filtrage des configurations vides

Si `enabled == false` ET tous les champs de contenu sont vides → retourne `null`.

#### 9. Structure de retour

```json
{
  "enabled": true,
  "mode": "static",
  "workflow": "myWorkflow",
  "entryPoint": "main",
  "arguments": { "key": "value" },
  "staticChoices": [ { "name": "Option A", "value": "a" } ],
  "inlineActions": [ { "type": "...", "payload": {} } ]
}
```

Les clés `staticChoices` et `inlineActions` ne sont présentes que si les listes sont non vides.

---

### `findFocusedInteractionOption(options)`

Trouve récursivement l'option d'interaction actuellement focalisée (celle pour laquelle l'utilisateur tape du texte).

```dart
InteractionOption? findFocusedInteractionOption(
  List<InteractionOption>? options,
)
```

**Algorithme récursif :**

1. Si `options` est `null` → retourne `null`.
2. Parcourt chaque option :
   - Si `option.isFocused == true` → retourne cette option.
   - Sinon, appelle récursivement `findFocusedInteractionOption(option.options)`.
   - Si une option focalisée est trouvée dans les enfants → la retourne.
3. Si aucune option focalisée n'est trouvée → retourne `null`.

---

### `resolveAutocompleteConfigForInteraction(...)`

Résout la configuration d'autocomplétion applicable pour une interaction en cours, en naviguant la hiérarchie des sous-commandes et groupes.

```dart
Map<String, dynamic>? resolveAutocompleteConfigForInteraction({
  required dynamic storedOptions,
  required List<InteractionOption>? interactionOptions,
})
```

**Algorithme de navigation hiérarchique :**

1. Trouve l'option focalisée via `findFocusedInteractionOption(interactionOptions)`.
   - Si aucune → retourne `null`.
2. Convertit les options stockées (`storedOptions`) en liste typée via `_coerceSerializedOptions`.
3. Boucle de navigation :
   a. **Si un `subCommandGroup` est présent** dans les options d'interaction courantes :
      - Trouve le groupe stocké correspondant via `_findSerializedOption`.
      - Descend dans les options enfants du groupe.
      - Continue la boucle.
   b. **Si un `subCommand` est présent** :
      - Trouve la sous-commande stockée correspondante via `_findSerializedOption`.
      - Descend dans les options enfants de la sous-commande.
      - Continue la boucle.
   c. **Sinon** : sort de la boucle.
4. Une fois au niveau de l'option focalisée, trouve l'option stockée correspondante via `_findSerializedOption`.
5. Extrait et normalise la configuration d'autocomplétion : `storedFocused['autocomplete']` → `normalizeSerializedAutocompleteConfig`.

---

## Fonctions internes

### `_coerceSerializedOptions(raw)`

Convertit une donnée brute en liste typée de `Map<String, dynamic>`.

- Si `raw` n'est pas une `List` → retourne une liste vide.
- Filtre uniquement les éléments de type `Map`.
- Convertit chaque entrée : toutes les clés en `String`.

### `_findSerializedOption(options, name)`

Recherche une option par nom (insensible à la casse) dans une liste d'options sérialisées.

- Normalise le nom recherché : `trim().toLowerCase()`.
- Ignore les noms vides.
- Compare avec `option['name']` normalisé de la même façon.
- Retourne l'option trouvée ou `null`.

---

## Flux de résolution d'autocomplétion

```
Interaction Autocomplete Discord
        │
        ▼
findFocusedInteractionOption(interactionOptions)
        │
        ├── null → pas d'option focalisée, pas d'autocomplétion
        │
        └── InteractionOption focused
                │
                ▼
resolveAutocompleteConfigForInteraction(
  storedOptions: commandData.options,
  interactionOptions: interactionOptions
)
        │
        ├── Navigation hiérarchique :
        │   ├── subCommandGroup ? → descendre dans les enfants
        │   ├── subCommand ? → descendre dans les enfants
        │   └── niveau terminal → trouver l'option focalisée
        │
        ▼
normalizeSerializedAutocompleteConfig(option['autocomplete'])
        │
        ├── null → pas de config ou config vide
        │
        └── Map {
              enabled, mode (static/inline/workflow),
              workflow, entryPoint, arguments,
              staticChoices?, inlineActions?
            }
```
