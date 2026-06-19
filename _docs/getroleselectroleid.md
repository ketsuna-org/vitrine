---
layout: doc
title: $getRoleSelectRoleID
translation_key: docs
category: "Entity Info"
function_name: getRoleSelectRoleID
syntax: $getRoleSelectRoleID[(index)]
description: Gets the ID of the role selected par the user via un menu of sélection of roles (role select).
---

# $getRoleSelectRoleID

The function `$getRoleSelectRoleID[]` allows **récupérer the ID of the role** choisi par the user in a menu of sélection of roles.

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

- Utilisé in thes interactions of type `$onInteraction[]` with a menu of sélection of roles.
- Le menu of roles est created with `$addRoleSelectMenu[]`.
- Functionne with the sélection simple or multiple (pour multiple, use `$getRoleSelectRoleIDs[]`).

## Examples

### Attributeion of role via sélection

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

### Récupération with index

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

- L'index commence to 1.
- Pour récupérer all roles of une sélection multiple, use `$getRoleSelectRoleIDs[]`.
- The ID retourné est utilisable with all functions manipulant roles.
