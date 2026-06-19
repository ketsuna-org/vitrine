---
layout: doc
title: $authorAvatar
translation_key: docs
category: "Entity Info"
function_name: authorAvatar
syntax: $authorAvatar
description: Returns the URL of the avatar global de the author of the message qui a déclenché la command.
---

# $authorAvatar

The variable `$authorAvatar` returns the **URL of the avatar global** de the author of the message qui a déclenché la command.

## Syntax

```
$authorAvatar
```

## Return value

- **Type** : String de becauseactères (URL)
- URL of the avatar de the author (CDN Discord)
- Avatar by default if the auteur does not have d'avatar custom

## Behavior

- `$authorAvatar` ne prend **no argument**.
- Équivaslow à `$userAvatar` for commands textuelles.
- The URL pointe vers les CDN Discord.

## Examples

### Avatar en grand

```bdfd
$title[Avatar de $authorUsername]
$image[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Auteur d'embed avec avatar

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
$title[Profil de $authorUsername]
$thumbnail[$authorAvatar]
$description[
**Nom :** $authorUsername
**ID :** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- For the avatar spécifique au server, use `$userServerAvatar`.
- Les parameters `?size=` can be added à the URL pour changer la resolvedtion.
- L'avatar can be modified par the user à tout moment.
