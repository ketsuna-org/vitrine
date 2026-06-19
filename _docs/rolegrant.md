---
layout: doc
title: $roleGrant
translation_key: docs
category: "Moderation"
function_name: roleGrant
syntax: $roleGrant[userID;roleID;(guildID)]
description: Attribue un role to un member of the server.
---

# $roleGrant

The function `$roleGrant` **attribue un role** to un member of the server Discord. The bot doit avoir la permission `ManageRoles` pour effectuer cette action.

## Syntax

```
$roleGrant[userID;roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the member cible. Required. |
| `roleID` | The ID of the role to attribuer. Required. |
| `guildID` | Optional. The ID of the server cible. |

## Return Value

Aucune. The function effectue l'action of attributeion.

## Examples

### Attributeion simple

```bdfd
$roleGrant[$authorID;$roleID[Member]]
$sendMessage[Vous avez now the role Member !]
```

### Vérification before attributeion

```bdfd
$if[$roleExists[$roleID[VIP]]==true]
  $roleGrant[$authorID;$roleID[VIP]]
  $sendMessage[Role VIP attribué with success !]
$else
  $sendMessage[The role VIP n'existe pas.]
$endif
```

### Attributeion to un autre member

```bdfd
$roleGrant[$mentioned[1];$roleID[Muet]]
$sendMessage[<@$mentioned[1]> was rendu muet.]
```

### Avec vérification of hiérarchie

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]>$rolePosition[$roleID[Modo]]]
  $roleGrant[$mentioned[1];$roleID[Modo]]
  $sendMessage[<@$mentioned[1]> est now Modérateur !]
$else
  $sendMessage[Vous n'avez pas la permission of promouvoir modérateurs.]
$endif
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- The bot ne peut pas attribuer un role supérieur to son propre role le plus haut.
- Si le member a déjà the role, rien ne se passe.
- Pour retirer un role, utilisez `$roleRemove`.
