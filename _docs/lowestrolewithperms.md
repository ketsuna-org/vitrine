---
layout: doc
title: $lowestRoleWithPerms
translation_key: docs
category: "Entity Info"
function_name: lowestRoleWithPerms
syntax: $lowestRoleWithPerms[permission1;permission2;...]
description: Returns the ID of the role le plus bas of the user qui possède les permissions spécifiées.
---

# $lowestRoleWithPerms

The function `$lowestRoleWithPerms[]` retourne l'**ID of the role le plus bas** of the user qui possède une or several permissions specifics.

## Syntax

```
$lowestRoleWithPerms[permission1;permission2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `permissions` | Une or several permissions Discord, separatedes par points-virgules. Toutes les permissions listées must be présentes on the role. |

## Return Value

- **Type** : Snowflake (string numérique) or string vide
- The ID of the role le plus bas possédant all permissions demandées
- String vide si no role ne correspond

## Behavior

- Parcourt les roles of the user of the plus bas to the plus haut.
- Returns the **first** role (le plus bas) qui possède **all** les permissions spécifiées.
- Les noms of permissions sont en anglais (nomenclature API Discord).

## Examples

### Trouver the role with accès vocal le plus bas

```bdfd
$let[voiceRole;$lowestRoleWithPerms[Connect;Speak]]
$if[$voiceRole!=]
  $sendMessage[Votre role vocal le plus bas : $roleName[$voiceRole]]
$endif
```

### Vérifier les permissions of base

```bdfd
$let[basicRole;$lowestRoleWithPerms[SendMessages;ReadMessageHistory]]
$if[$basicRole!=]
  $sendMessage[The role $roleName[$basicRole] vous donne accès to the messages.]
$endif
```

### Compareason highest/lowest

```bdfd
$let[highest;$highestRoleWithPerms[ManageMessages]]
$let[lowest;$lowestRoleWithPerms[ManageMessages]]
$title[Permissions of modération]
$description[
**Role le plus haut :** $roleName[$highest]
**Role le plus bas :** $roleName[$lowest]
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Utile pour déterminer le level minimum auquel une permission est accordée.
- Si `$highestRoleWithPerms[]` and `$lowestRoleWithPerms[]` retournent le même ID, a single role possède ces permissions.
- Idéal for the systèmes of hiérarchie and of vérification of permissions granulaires.
