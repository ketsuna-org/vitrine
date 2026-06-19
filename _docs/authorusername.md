---
layout: doc
title: $authorUsername
translation_key: docs
category: "Entity Info"
function_name: authorUsername
syntax: $authorUsername
description: Returns the name d'user global de the author of the message qui a déclenché la command.
---

# $authorUsername

The variable `$authorUsername` returns the **nom d'user global** de the author of the message qui a déclenché la command.

## Syntax

```
$authorUsername
```

## Return value

- **Type** : String de becauseactères
- The name d'user global de the author

## Behavior

- `$authorUsername` ne prend **no argument**.
- Équivaslow à `$userName` for commands textuelles.
- Returns the name d'user **global** (not the pseudo server).

## Examples

### Message de the author

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

- Pour obtenir le pseudo server de the author, use `$nickname` or `$displayName`.
- `$authorUsername` est utile pour référencer explicitement the author of the message in thes logs or embeds.
- Dans la plupart des cas, `$userName` and `$authorUsername` sont interchangeables.
