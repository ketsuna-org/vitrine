---
layout: doc
title: $getRoleSelectRoleID
translation_key: docs
category: "Entity Info"
function_name: getRoleSelectRoleID
syntax: $getRoleSelectRoleID[(index)]
description: Gets the ID of the role selected par the user via un menu de sélection de roles (role select).
---

# $getRoleSelectRoleID

The function `$getRoleSelectRoleID[]` allows **récupérer the ID of the role** choisi par the user dans un menu de sélection de roles.

## Syntax

```
$getRoleSelectRoleID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - L'index of the role selected (1 = first). Par default 1. |

## Return Value

- **Type** : String (Snowflake ID)
- The ID Discord of the role selected.
- String vide si no role n'was selected.

## Behavior

- Utilisé in thes interactions de type `$onInteraction[]` with a menu de sélection de roles.
- Le menu de roles est created avec `$addRoleSelectMenu[]`.
- Functionne with the sélection simple or multiple (pour multiple, utiliser `$getRoleSelectRoleIDs[]`).

## Examples

### Attributeion de role via sélection

```bdfd
$nominalTrigger
$addRoleSelectMenu[role_select;1;Choisissez votre role]
$sendMessage[Sélectionnez un role :]

$onInteraction[role_select]
$let[roleID;$getRoleSelectRoleID]
$giveRole[$authorID;$roleID]
$title[Role attribué]
$description[Vous avez received the role **$roleName[$roleID]** !]
$color[#57F287]
$sendMessage[]
```

### Récupération avec index

```bdfd
$onInteraction[role_select]
$let[first;$getRoleSelectRoleID[1]]
$let[second;$getRoleSelectRoleID[2]]
$title[Roles selecteds]
$description[
**Role 1 :** $roleName[$first]
**Role 2 :** $roleName[$second]
]
$sendMessage[]
```

## Notes

- L'index commence à 1.
- Pour récupérer all roles d'une sélection multiple, utiliser `$getRoleSelectRoleIDs[]`.
- The ID retourné est utilisable avec all functions manipulant des roles.
