---
layout: doc
title: $takeRoles
translation_key: docs
category: "Moderation"
function_name: takeRoles
syntax: $takeRoles[userID;role1;role2;...]
description: Retire several roles à un user en a single opération.
---

# $takeRoles

The function `$takeRoles` **retire several roles en une fois** à un user on the server Discord. The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$takeRoles[userID;role1;role2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Required. |
| `role1;role2;...` | Les IDs des roles à retirer, separateds par des `;`. Required. |

## Return Value

Aucune. Tous les roles spécifiés sont retirés.

## Examples

### Retrait multiple simple

```bdfd
$takeRoles[$mentioned[1];$roleID[Muet];$roleID[Averti];$roleID[Surveillance]]
$sendMessage[Toutes les sanctions de <@$mentioned[1]> were levées.]
```

### Nettoyage de roles

```bdfd
$if[$isAdmin==true]
  $takeRoles[$mentioned[1];$roleID[VIP];$roleID[Staff];$roleID[Modo]]
  $sendMessage[Tous les roles special retirés de <@$mentioned[1]>.]
$endif
```

### Retrait conditionnel

```bdfd
$takeRoles[$authorID;$roleID[Old];$roleID[Inactif]]
$giveRole[$authorID;$roleID[Actif]]
$sendMessage[Roles mis à day !]
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- Les roles sont separateds par `;`.
- Pour retirer a single role, `$takeRole` est plus simple.
- Les roles non possédés par the user sont ignorés silencieusement.
- Pour redéfinir completement les roles, utilisez `$setUserRoles`.
