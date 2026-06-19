---
layout: doc
title: "Système — CommandWorkflowRouting"
translation_key: docs
category: systems
description: >
  Documentation du module de routage des sous-commandes et workflows.
  Résolution de la route de sous-commande à partir des options d'interaction
  Discord, récupération du payload workflow associé, et normalisation des
  types et noms d'options.
---

# Système — CommandWorkflowRouting

Le module `CommandWorkflowRouting` est responsable de la résolution des sous-commandes Discord et de l'extraction des payloads de workflow associés. Il est implémenté dans `packages/shared/lib/utils/command_workflow_routing.dart` (141 lignes).

Ce module est utilisé lors du traitement des interactions de type slash command pour déterminer quelle sous-commande (ou groupe de sous-commandes) a été invoquée, puis récupérer le workflow spécifique à cette route.

---

## Fonctions exportées

### `resolveSubcommandRoute(rootOptions)`

Parse une liste d'options d'interaction Discord pour déterminer la route de la sous-commande invoquée.

```dart
String? resolveSubcommandRoute(dynamic rootOptions)
```

**Paramètre :**

| Paramètre      | Type       | Description                                              |
|----------------|------------|----------------------------------------------------------|
| `rootOptions`  | `dynamic`  | Options racine de l'interaction (doit être un `Iterable`) |

**Retour :**

| Valeur                        | Signification                                                        |
|-------------------------------|----------------------------------------------------------------------|
| `"subcommandName"`            | Une sous-commande directe a été trouvée                              |
| `"groupName/subcommandName"`  | Une sous-commande imbriquée dans un groupe a été trouvée              |
| `null`                        | Aucune sous-commande trouvée ou `rootOptions` n'est pas un `Iterable` |

**Algorithme :**

1. Si `rootOptions` n'est pas un `Iterable`, retourne `null`.
2. Itère sur chaque option :
   - Lit le `type` (via `readOptionField`) et le normalise avec `normalizeOptionType`.
   - Lit le `name` (via `readOptionField`) et le normalise avec `normalizeOptionName`.
3. Si le type normalisé est `"subcommand"` et le nom non vide → retourne le nom.
4. Si le type normalisé est `"subcommandgroup"` et le nom non vide :
   - Lit les options enfants (`options`) de l'option.
   - Si les options enfants sont un `Iterable`, cherche parmi elles une option de type `"subcommand"`.
   - Si trouvée → retourne `"groupName/childName"`.
5. Sinon → retourne `null`.

---

### `resolveSubcommandWorkflowPayload(commandValue, route)`

Récupère le payload de workflow spécifique à une route de sous-commande donnée.

```dart
Map<String, dynamic>? resolveSubcommandWorkflowPayload(
  Map<String, dynamic> commandValue,
  String route,
)
```

**Paramètres :**

| Paramètre       | Type                     | Description                                       |
|-----------------|--------------------------|---------------------------------------------------|
| `commandValue`  | `Map<String, dynamic>`   | Données de la commande contenant `subcommandWorkflows` |
| `route`         | `String`                 | Route normalisée (ex: `"group/subcommand"`)       |

**Retour :**

- Un `Map<String, dynamic>` contenant le payload du workflow pour la route, ou `null` si :
  - La route (trimée) est vide.
  - `commandValue['subcommandWorkflows']` n'est pas un `Map`.
  - La route n'existe pas dans la map des workflows.
  - La valeur trouvée n'est pas un `Map`.

---

### `normalizeOptionType(rawType)`

Normalise une valeur brute de type d'option Discord vers une chaîne canonique en minuscules.

```dart
String normalizeOptionType(dynamic rawType)
```

**Logique de normalisation (par ordre de priorité) :**

1. Si `rawType == CommandOptionType.subCommand` → `"subcommand"`
2. Si `rawType == CommandOptionType.subCommandGroup` → `"subcommandgroup"`
3. Si `rawType` est numérique (`num`) :
   - `1` → `"subcommand"`
   - `2` → `"subcommandgroup"`
4. Tente de lire le nom d'énumération via `_tryReadEnumName`.
5. Fallback : `rawType.toString()` → trim → lowercase → suppression des caractères non alphanumériques.
6. Si le résultat se termine par `"subcommandgroup"` → `"subcommandgroup"`.
7. Si le résultat se termine par `"subcommand"` → `"subcommand"`.
8. Sinon, retourne la chaîne normalisée.

---

### `normalizeOptionName(rawName)`

Normalise un nom d'option en trimant les espaces.

```dart
String normalizeOptionName(dynamic rawName)
```

- Convertit en `String` (via `toString()`), avec fallback `""` si `null`.
- Applique `.trim()`.

---

### `readOptionField(option, field)`

Lit un champ nommé depuis une option, qui peut être un `Map` ou un objet typé.

```dart
dynamic readOptionField(dynamic option, String field)
```

**Support :**

| Champ     | Accès Map      | Accès objet typé             |
|-----------|----------------|------------------------------|
| `type`    | `option[field]` | `(option as dynamic).type`   |
| `name`    | `option[field]` | `(option as dynamic).name`   |
| `options` | `option[field]` | `(option as dynamic).options`|

- Si `option` est un `Map` → retourne `option[field]`.
- Si `option` est un objet typé → tente d'accéder à la propriété via `(option as dynamic).type/name/options`.
- En cas d'erreur ou de champ non reconnu → retourne `null`.

---

## Fonction interne

### `_tryReadEnumName(value)`

Tente d'obtenir le nom d'énumération d'une valeur (propriété `name`) pour la normalisation de type.

- Tente `(value as dynamic).name`
- Retourne la chaîne si elle est non vide après trim
- Retourne `null` en cas d'erreur ou si le nom est vide

---

## Flux d'utilisation typique

```
Interaction Discord (Slash Command)
        │
        ▼
resolveSubcommandRoute(interaction.options)
        │
        ├── null → pas de sous-commande
        │
        └── "group/subcommand"
                │
                ▼
resolveSubcommandWorkflowPayload(commandData, route)
                │
                ├── null → pas de workflow spécifique
                │
                └── Map<String, dynamic> → payload du workflow
                        │
                        ▼
                Exécution du workflow
```
