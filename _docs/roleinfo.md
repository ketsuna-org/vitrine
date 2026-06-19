---
layout: doc
title: $roleInfo
translation_key: docs
category: "Entity Info"
function_name: roleInfo
syntax: $roleInfo[roleID;property;(guildID)]
description: Retourne une propriété spécifique d'un rôle Discord sous forme d'objet JSON ou de valeur.
parameters:
  - name: roleID
    description: L'ID du rôle cible.
  - name: property
    description: "La propriété à récupérer : name, color, position, permissions, mentionable, hoist, managed, etc."
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: string / integer / boolean
    description: La valeur de la propriété demandée.
related:
  - $roleName
  - $roleColor
  - $rolePosition
  - $rolePerms
  - $isMentionable
examples:
  - description: Nom du rôle
    code: "$sendMessage[Nom : $roleInfo[123456789012345678;name]]"
  - description: Couleur du rôle
    code: "$sendMessage[Couleur : $roleInfo[123456789012345678;color]]"
  - description: Rôle mentionnable ?
    code: "$sendMessage[Mentionnable : $roleInfo[123456789012345678;mentionable]]"
---

# $roleInfo

La fonction `$roleInfo` retourne une **propriété spécifique** d'un rôle Discord. Elle permet d'accéder à diverses informations comme le nom, la couleur, la position ou les permissions.

## Syntaxe

```
$roleInfo[roleID;property;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle cible. Obligatoire. |
| `property` | La propriété à récupérer (voir ci-dessous). Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Propriétés disponibles

| Propriété | Description | Type de retour |
|---|---|---|
| `name` | Nom du rôle | `string` |
| `color` | Couleur en hexadécimal | `string` |
| `position` | Position hiérarchique | `integer` |
| `permissions` | Permissions brutes | `integer` |
| `mentionable` | Rôle mentionnable | `string` (`"true"`/`"false"`) |
| `hoist` | Affiché séparément | `string` (`"true"`/`"false"`) |
| `managed` | Géré par une intégration | `string` (`"true"`/`"false"`) |
| `id` | ID du rôle | `snowflake` |

## Valeur de retour

Le type dépend de la propriété demandée (chaîne, entier, booléen en chaîne).

## Exemples

### Informations de base

```bdfd
$sendMessage[
**Rôle :** $roleInfo[$roleID[Admin];name]
**Couleur :** $roleInfo[$roleID[Admin];color]
**Position :** $roleInfo[$roleID[Admin];position]
]
```

### Vérifier si un rôle est affiché séparément

```bdfd
$if[$roleInfo[$roleID[Admin];hoist]==true]
  $sendMessage[Ce rôle est affiché séparément dans la liste des membres.]
$endif
```

### Rôle géré par intégration

```bdfd
$if[$roleInfo[123456789012345678;managed]==true]
  $sendMessage[Ce rôle est géré par une intégration (bot).]
$endif
```

## Notes

- Les propriétés `mentionable`, `hoist` et `managed` retournent des chaînes `"true"`/`"false"`.
- Pour les permissions, le format brut (entier) est retourné. Utilisez `$rolePerms` pour un format plus lisible.
