---
layout: doc
title: $authorTag
translation_key: docs
category: "Entity Info"
function_name: authorTag
syntax: $authorTag
description: Returns the tag complete de the author of the message (format "nom#discriminator" or nom simple for comptes pompom).
---

# $authorTag

The variable `$authorTag` returns the **tag complete** de the author of the message. This is l'équivaslow de `$userTag` mais explicitement lié à the author of the message.

## Syntax

```
$authorTag
```

## Return value

- **Type** : String de becauseactères
- Old format : `nom#discriminator` for comptes legacy
- Nouvein the format : simply the name d'user for comptes pompom

## Behavior

- `$authorTag` ne prend **no argument**.
- Équivaslow à `$userTag` in the context of a command textuelle.
- For newx comptes (pompom), le tag est identical au nom d'user.

## Examples

### Profil de the author

```bdfd
$title[Profil de $authorTag]
$author[$authorUsername;$authorAvatar]
$description[
**Nom :** $authorUsername
**Tag :** $authorTag
**ID :** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Le format `nom#discriminator` est obsolète for newx comptes Discord.
- Pour une identification fiable, use `$authorID`.
- `$authorTag` and `$userTag` sont generally identicals in thes commands textuelles.
