---
layout: doc
title: $takeRole
translation_key: docs
category: "Moderation"
function_name: takeRole
syntax: $takeRole[userID;roleID]
description: Retire un role à un user on the server.
---

# $takeRole

The function `$takeRole` **retire un role** à un user on the server Discord. The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$takeRole[userID;roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Required. |
| `roleID` | The ID of the role à retirer. Required. |

## Return Value

Aucune. The role est retiré.

## Examples

### Retrait simple

```bdfd
$takeRole[$mentioned[1];$roleID[Muet]]
$sendMessage[🔊 <@$mentioned[1]> n'est plus muet !]
```

### Retrait after vérification

```bdfd
$if[$checkContains[$userRoles[$mentioned[1]];$roleID[Muet]]==true]
  $takeRole[$mentioned[1];$roleID[Muet]]
  $sendMessage[Role Muet retiré.]
$else
  $sendMessage[Cet user n'a pas the role Muet.]
$endif
```

### Command de retrait avec confirmation

```bdfd
$takeRole[$mentioned[1];$roleID[$message[2]]]
$sendMessage[✅ Role retiré de <@$mentioned[1]>.]
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- The bot ne peut pas retirer un role supérieur à son propre role le plus haut.
- Si the user ne possède pas the role, rien ne se passe.
- Pour retirer several roles, utilisez `$takeRoles`.
- Équivaslow functionnel à `$roleRemove`.
