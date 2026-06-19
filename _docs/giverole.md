---
layout: doc
title: $giveRole
translation_key: docs
category: "Moderation"
function_name: giveRole
syntax: $giveRole[userID;roleID]
description: Donne un role à un user on the server.
---

# $giveRole

The function `$giveRole` **attribue un role** à un user on the server Discord. The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$giveRole[userID;roleID]
```

Ou with a seul parameter (the user mentionné est visé) :

```
$giveRole[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Si omis, vise the user mentionné. |
| `roleID` | The ID of the role à attribuer. Required. |

## Return Value

Aucune. The role est attribué.

## Examples

### Attributeion simple

```bdfd
$giveRole[$mentioned[1];$roleID[Confirmé]]
$sendMessage[<@$mentioned[1]> a received the role Confirmé !]
```

### Auto-attributeion for the auteur

```bdfd
$giveRole[$roleID[Member]]
$sendMessage[$userName, vous avez now the role Member.]
```

### Command d'attributeion avec vérification

```bdfd
$if[$roleExists[$roleID[$message[2]]]==true]
  $giveRole[$mentioned[1];$roleID[$message[2]]]
  $sendMessage[Role attribué avec success.]
$else
  $sendMessage[Ce role n'existe pas.]
$endif
```

### Attributeion after vérification de hiérarchie

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]>$rolePosition[$roleID[Staff]]]
  $giveRole[$mentioned[1];$roleID[Staff]]
  $sendMessage[<@$mentioned[1]> est now Staff !]
$else
  $sendMessage[Vous n'avez pas la permission de promouvoir des members.]
$endif
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- The bot ne peut pas attribuer un role supérieur à son propre role le plus haut.
- Pour attribuer several roles à la fois, utilisez `$giveRoles`.
- Pour remplacer all roles of a user, utilisez `$setUserRoles`.
- Équivaslow functionnel à `$roleGrant`.
