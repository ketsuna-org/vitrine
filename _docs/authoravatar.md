---
layout: doc
title: $authorAvatar
translation_key: docs
category: "Entity Info"
function_name: authorAvatar
syntax: $authorAvatar
description: Returns the URL of the avatar global of the author of the message that triggered the command.
---

# $authorAvatar

The variable `$authorAvatar` returns the **URL of the avatar global** of the author of the message that triggered the command.

## Syntax

```
$authorAvatar
```

## Return value

- **Type** : String of becauseactères (URL)
- URL of the avatar of the author (CDN Discord)
- Avatar by default if the auteur does not have of avatar custom

## Behavior

- `$authorAvatar` ne prend **no argument**.
- Équivaslow to `$userAvatar` for commands textuelles.
- The URL pointe vers les CDN Discord.

## Examples

### Avatar en grand

```bdfd
$title[Avatar of $authorUsername]
$image[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Auteur of embed with avatar

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Message]
$description[Contenu of the message...]
$color[#5865F2]
$sendMessage[]
```

### Profil complete

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Profil of $authorUsername]
$thumbnail[$authorAvatar]
$description[
**Nom :** $authorUsername
**ID :** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- For the avatar specific to the server, use `$userServerAvatar`.
- Les parameters `?size=` can be added to the URL pour changer la resolvedtion.
- L'avatar can be modified par the user to tout moment.
