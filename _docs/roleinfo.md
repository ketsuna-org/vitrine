---
layout: doc
title: $roleInfo
translation_key: docs
category: "Entity Info"
function_name: roleInfo
syntax: $roleInfo[roleID;property;(guildID)]
description: Returns ae property spécifique of a role Discord sous forme d'JSON object or de value.
---

# $roleInfo

The function `$roleInfo` retourne une **property spécifique** of a role Discord. Elle allows to accéder à diverses informations comme the name, the color, the position or les permissions.

## Syntax

```
$roleInfo[roleID;property;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role cible. Required. |
| `property` | La property à récupérer (voir ci-dessous). Required. |
| `guildID` | Optional. The ID of the server cible. |

## Propertys availables

| Property | Description | Type de retour |
|---|---|---|
| `name` | Nom of the role | `string` |
| `color` | Couleur en hexadecimal | `string` |
| `position` | Position hiérarchique | `integer` |
| `permissions` | Permissions brutes | `integer` |
| `mentionable` | Role mentionnable | `string` (`"true"`/`"false"`) |
| `hoist` | Displayed separatedment | `string` (`"true"`/`"false"`) |
| `managed` | Géré par une intégration | `string` (`"true"`/`"false"`) |
| `id` | ID of the role | `snowflake` |

## Return Value

The type dépend de la property demandée (string, integer, boolean en string).

## Examples

### Informations de base

```bdfd
$sendMessage[
**Role :** $roleInfo[$roleID[Admin];name]
**Couleur :** $roleInfo[$roleID[Admin];color]
**Position :** $roleInfo[$roleID[Admin];position]
]
```

### Vérifier if a role est displayed separatedment

```bdfd
$if[$roleInfo[$roleID[Admin];hoist]==true]
  $sendMessage[Ce role est displayed separatedment in the list des members.]
$endif
```

### Role géré par intégration

```bdfd
$if[$roleInfo[123456789012345678;managed]==true]
  $sendMessage[Ce role est géré par une intégration (bot).]
$endif
```

## Notes

- Les propertys `mentionable`, `hoist` and `managed` retournent des strings `"true"`/`"false"`.
- Pour les permissions, le format brut (integer) est retourné. Utilisez `$rolePerms` for a format plus lisible.
