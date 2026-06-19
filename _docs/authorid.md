---
layout: doc
title: $authorID
translation_key: docs
category: "Entity Info"
function_name: authorID
syntax: $authorID
description: Returns the ID Discord de the author of the message qui a déclenché la command.
---

# $authorID

The variable `$authorID` returns the **ID Discord** de the author of the message qui a déclenché l'execution of the command.

## Syntax

```
$authorID
```

## Return value

- **Type** : Snowflake (string numérique de 17-19 chiffres)
- The ID unique de the author of the message

## Behavior

- `$authorID` ne prend **no argument**.
- Dans le context of a command textuelle, `$authorID` est the ID of the personne qui a sent the message.
- Dans la plupart des cas simples, `$authorID` and `$userID` sont identicals.

## Examples

### Profil de the author

```bdfd
$title[Profil de $authorUsername]
$author[$authorUsername;$authorAvatar]
$description[
**ID :** $authorID
**Tag :** $authorTag
]
$color[#5865F2]
$sendMessage[]
```

### Vérification du owner

```bdfd
$if[$authorID==123456789012345678]
  $sendMessage[Bonday owner !]
$endif
```

## Notes

- `$authorID` est the ID of the **auteur of the message**, tandis que `$userID` est the ID of the **user déclencheur**. Dans les commands textuelles, they are identicals.
- Use `$authorID` to more than clarté sémantique dans the code lié aux messages.
