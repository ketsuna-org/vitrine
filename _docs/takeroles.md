---
layout: doc
title: $takeRoles
translation_key: docs
category: "Moderation"
function_name: takeRoles
syntax: $takeRoles[userID;role1;role2;...]
description: Retire several roles to un user en a single opération.
---

# $takeRoles

The function `$takeRoles` **retire several roles en une fois** to un user on the server Discord. The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$takeRoles[userID;role1;role2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Required. |
| `role1;role2;...` | Les IDs roles to retirer, separateds par `;`. Required. |

## Return Value

Aucune. Tous les roles spécifiés sont retirés.

## Examples

### Retrait multiple simple

```bdfd
$takeRoles[$mentioned[1];$roleID[Muet];$roleID[Averti];$roleID[Surveillance]]
$sendMessage[Toutes les sanctions of <@$mentioned[1]> were levées.]
```

### Nettoyage of roles

```bdfd
$if[$isAdmin==true]
  $takeRoles[$mentioned[1];$roleID[VIP];$roleID[Staff];$roleID[Modo]]
  $sendMessage[Tous les roles special retirés of <@$mentioned[1]>.]
$endif
```

### Retrait conditionnel

```bdfd
$takeRoles[$authorID;$roleID[Old];$roleID[Inactif]]
$giveRole[$authorID;$roleID[Actif]]
$sendMessage[Roles mis to day !]
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- Les roles sont separateds par `;`.
- Pour retirer a single role, `$takeRole` est plus simple.
- Les roles non possédés par the user sont ignorés silencieusement.
- Pour redefine completement les roles, utilisez `$setUserRoles`.
