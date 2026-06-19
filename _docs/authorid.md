---
layout: doc
title: $authorID
translation_key: docs
category: "Entity Info"
function_name: authorID
syntax: $authorID
description: Returns the ID Discord of the author of the message that triggered the command.
---

# $authorID

The variable `$authorID` returns the **ID Discord** of the author of the message that triggered l'execution of the command.

## Syntax

```
$authorID
```

## Return value

- **Type** : Snowflake (string numérique of 17-19 chiffres)
- The ID unique of the author of the message

## Behavior

- `$authorID` ne prend **no argument**.
- Dans le context of a command textuelle, `$authorID` est the ID of the personne qui a sent the message.
- Dans la plupart cas simples, `$authorID` and `$userID` sont identicals.

## Examples

### Profil of the author

```bdfd
$title[Profil of $authorUsername]
$author[$authorUsername;$authorAvatar]
$description[
**ID :** $authorID
**Tag :** $authorTag
]
$color[#5865F2]
$sendMessage[]
```

### Vérification of the owner

```bdfd
$if[$authorID==123456789012345678]
  $sendMessage[Bonday owner !]
$endif
```

## Notes

- `$authorID` est the ID of the **auteur of the message**, tandis que `$userID` est the ID of the **user déclencheur**. Dans les commands textuelles, they are identicals.
- Use `$authorID` to more than clarté sémantique in the code lié to the messages.
