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

The function `$highestRoleWithPerms[]` retourne l'**ID of the role le plus élevé** of the user qui possède une or several permissions spécifiques.

## Syntax

```
$highestRoleWithPerms[permission1;permission2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `permissions` | Une or several permissions Discord, separatedes par des points-virgules. Toutes les permissions listées must be présentes sur the role. |

## Return Value

- **Type** : Snowflake (string numérique) or string vide
- The ID of the role correspondant le plus haut
- String vide si no role ne possède all permissions demandées

## Behavior

- Parcourt les roles of the user du plus haut au plus bas.
- Returns the **first** role (le plus haut) qui possède **all** les permissions spécifiées.
- Les noms de permissions sont en anglais (nomenclature API Discord).

## Examples

### Trouver the role modérateur

```bdfd
$let[modRole;$highestRoleWithPerms[ManageMessages]]
$if[$modRole!=]
  $sendMessage[Votre role de modération : $roleName[$modRole]]
$else
  $sendMessage[Vous n'avez pas de role de modération.]
$endif
```

### Vérifier the role admin

```bdfd
$if[$highestRoleWithPerms[Administrator]!=]
  $sendMessage[Vous avez un role administrator.]
$endif
```

### Role avec permissions de ban

```bdfd
$let[banRole;$highestRoleWithPerms[BanMembers]]
$if[$banRole!=]
  $title[Role de ban]
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
- Pour the role le plus bas avec ces permissions, utilisez `$lowestRoleWithPerms[]`.
