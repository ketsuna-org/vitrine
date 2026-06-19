---
layout: doc
title: $setUserRoles
translation_key: docs
category: "Moderation"
function_name: setUserRoles
syntax: $setUserRoles[userID;role1;role2;...]
description: Sets the list exact des roles of a user, remplaçant all their roles currents.
---

# $setUserRoles

The function `$setUserRoles` **remplace all roles of a user** par une new list. Contrairement à `$giveRoles` qui ajoute des roles, `$setUserRoles` retire first all roles existings before d'attribuer ceux spécifiés. The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$setUserRoles[userID;role1;role2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Required. |
| `role1;role2;...` | List des IDs de roles à définir, separateds par `;`. |

## Return Value

Aucune. The roles of the user sont replaceds.

## Examples

### Réinitialisation des roles

```bdfd
$setUserRoles[$mentioned[1];$roleID[Member]]
$sendMessage[<@$mentioned[1]> n'a plus que the role Member.]
```

### Définition d'un set de roles

```bdfd
$setUserRoles[$mentioned[1];$roleID[Member];$roleID[VIP];$roleID[Actif]]
$sendMessage[Roles de <@$mentioned[1]> mis à day.]
```

### Promotion d'un member

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
$sendMessage[Tous les roles de <@$mentioned[1]> were retirés.]
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- **Tous les roles existings sont retirés** before d'appliquer les newx.
- Pour simplement ajouter des roles, préférez `$giveRoles`.
- Pour retirer des roles spécifiques, préférez `$takeRoles`.
- Laisser la list de roles vide retire all roles (except the role @everyone).
- The role @everyone ne peut pas être retiré.
