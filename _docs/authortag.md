---
layout: doc
title: $authorTag
translation_key: docs
category: "Entity Info"
function_name: authorTag
syntax: $authorTag
description: Returns the tag complete of the author of the message (format "nom#discriminator" or nom simple for comptes pompom).
---

# $authorTag

The variable `$authorTag` returns the **tag complete** of the author of the message. This is l'équivaslow of `$userTag` mais explicitement lié to the author of the message.

## Syntax

```
$authorTag
```

## Return value

- **Type** : String of becauseactères
- Old format : `nom#discriminator` for comptes legacy
- Nouvein the format : simply the name of user for comptes pompom

## Behavior

- `$authorTag` ne prend **no argument**.
- Équivaslow to `$userTag` in the context of a command textuelle.
- For newx comptes (pompom), le tag est identical to the nom of user.

## Examples

### Profil of the author

```bdfd
$title[Profil of $authorTag]
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
