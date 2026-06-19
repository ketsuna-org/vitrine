---
layout: doc
title: $giveRoles
translation_key: docs
category: "Moderation"
function_name: giveRoles
syntax: $giveRoles[userID;role1;role2;...]
description: Donne several roles à un user en a single opération.
---

# $giveRoles

The function `$giveRoles` **attribue several roles en une fois** à un user. C'est la version multi-roles de `$giveRole`. The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$giveRoles[userID;role1;role2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Required. |
| `role1;role2;...` | Les IDs des roles à attribuer, separateds par des `;`. Required. |

## Return Value

Aucune. Tous les roles spécifiés sont attribués.

## Examples

### Attributeion multiple simple

```bdfd
$giveRoles[$mentioned[1];$roleID[Member];$roleID[Notifications]]
$sendMessage[<@$mentioned[1]> a received les roles Member and Notifications.]
```

### Attributeion groupée avec condition

```bdfd
$if[$isAdmin==true]
  $giveRoles[$mentioned[1];$roleID[Modo];$roleID[Staff];$roleID[VIP]]
  $sendMessage[Tous les roles de staff attribués à <@$mentioned[1]>.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Command de bienvenue

```bdfd
$giveRoles[$authorID;$roleID[Member];$roleID[New];$roleID[Auto]]
$sendMessage[Bienvenue $userName ! Roles default attribués.]
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- Les roles sont separateds par `;` in the syntaxe.
- Pour attribuer a single role, `$giveRole` est plus simple.
- Pour remplacer all roles existings, utilisez `$setUserRoles`.
- Les roles déjà possédés par the user sont ignorés.
