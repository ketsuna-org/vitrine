---
layout: doc
title: $highestRoleWithPerms
translation_key: docs
category: "Entity Info"
function_name: highestRoleWithPerms
syntax: $highestRoleWithPerms[permission1;permission2;...]
description: Returns the ID of the role le plus haut of the user qui possède les permissions spécifiées.
---

# $highestRoleWithPerms

The function `$highestRoleWithPerms[]` retourne l'**ID of the role le plus élevé** of the user qui possède une or several permissions specifics.

## Syntax

```
$highestRoleWithPerms[permission1;permission2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `permissions` | Une or several permissions Discord, separatedes par points-virgules. Toutes les permissions listées must be présentes on the role. |

## Return Value

- **Type** : Snowflake (string numérique) or string vide
- The ID of the role correspondant le plus haut
- String vide si no role ne possède all permissions demandées

## Behavior

- Parcourt les roles of the user of the plus haut to the plus bas.
- Returns the **first** role (le plus haut) qui possède **all** les permissions spécifiées.
- Les noms of permissions sont en anglais (nomenclature API Discord).

## Examples

### Trouver the role modérateur

```bdfd
$let[modRole;$highestRoleWithPerms[ManageMessages]]
$if[$modRole!=]
  $sendMessage[Votre role of modération : $roleName[$modRole]]
$else
  $sendMessage[Vous n'avez pas of role of modération.]
$endif
```

### Vérifier the role admin

```bdfd
$if[$highestRoleWithPerms[Administrator]!=]
  $sendMessage[Vous avez un role administrator.]
$endif
```

### Role with permissions of ban

```bdfd
$let[banRole;$highestRoleWithPerms[BanMembers]]
$if[$banRole!=]
  $title[Role of ban]
  $description[
  **Role :** $roleName[$banRole]
  **ID :** $banRole
  ]
  $color[#ED4245]
  $sendMessage[]
$endif
```

## Notes

- Les permissions sont cumulatives : the role doit avoir **all** les permissions listées.
- Si vous voulez un role ayant **l'une or l'autre** permission, faites two calls separateds.
- Pour the role le plus bas with ces permissions, utilisez `$lowestRoleWithPerms[]`.
