---
layout: doc
title: $setUserRoles
translation_key: docs
category: "Moderation"
function_name: setUserRoles
syntax: $setUserRoles[userID;role1;role2;...]
description: Sets the list exact roles of a user, remplaçant all their roles currents.
---

# $setUserRoles

The function `$setUserRoles` **remplace all roles of a user** par une new list. Contrairement to `$giveRoles` qui ajoute roles, `$setUserRoles` retire first all roles existings before of attribuer ceux spécifiés. The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$setUserRoles[userID;role1;role2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Required. |
| `role1;role2;...` | List IDs of roles to définir, separateds par `;`. |

## Return Value

Aucune. The roles of the user sont replaceds.

## Examples

### Réinitialisation roles

```bdfd
$setUserRoles[$mentioned[1];$roleID[Member]]
$sendMessage[<@$mentioned[1]> n'a plus que the role Member.]
```

### Définition of un set of roles

```bdfd
$setUserRoles[$mentioned[1];$roleID[Member];$roleID[VIP];$roleID[Actif]]
$sendMessage[Roles of <@$mentioned[1]> mis to day.]
```

### Promotion of un member

```bdfd
$if[$isAdmin==true]
  $setUserRoles[$mentioned[1];$roleID[Modérateur];$roleID[Staff]]
  $sendMessage[<@$mentioned[1]> est now Modérateur !]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Nettoyage complete

```bdfd
$setUserRoles[$mentioned[1]]
$sendMessage[Tous les roles of <@$mentioned[1]> were retirés.]
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- **Tous les roles existings sont retirés** before of appliquer les newx.
- Pour simplement ajouter roles, préférez `$giveRoles`.
- Pour retirer roles specifics, préférez `$takeRoles`.
- Laisser la list of roles vide retire all roles (except the role @everyone).
- The role @everyone ne peut pas être retiré.
