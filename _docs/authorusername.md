---
layout: doc
title: $authorUsername
translation_key: docs
category: "Entity Info"
function_name: authorUsername
syntax: $authorUsername
description: Returns the name of user global of the author of the message that triggered the command.
---

# $authorUsername

The variable `$authorUsername` returns the **nom of user global** of the author of the message that triggered the command.

## Syntax

```
$authorUsername
```

## Return value

- **Type** : String of becauseactères
- The name of user global of the author

## Behavior

- `$authorUsername` ne prend **no argument**.
- Équivaslow to `$userName` for commands textuelles.
- Returns the name of user **global** (not the pseudo server).

## Examples

### Message of the author

```bdfd
$title[Command executede]
$author[$authorUsername;$authorAvatar]
$description[
**Auteur :** $authorUsername#$discriminator
**ID :** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Pour obtenir le pseudo server of the author, use `$nickname` or `$displayName`.
- `$authorUsername` est utile pour référencer explicitement the author of the message in thes logs or embeds.
- Dans la plupart cas, `$userName` and `$authorUsername` sont interchangeables.
