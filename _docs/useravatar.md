---
layout: doc
title: $userAvatar
translation_key: docs
category: "Entity Info"
function_name: userAvatar
syntax: $userAvatar
description: Returns the URL of the avatar global of the user qui triggered the command.
---

# $userAvatar

The variable `$userAvatar` retourne l'**URL of the avatar global** of the user qui triggered the command.

## Syntax

```
$userAvatar
```

## Return Value

- **Type** : String of becauseactères (URL)
- URL of the image of avatar Discord to the format PNG or WebP
- Si the user n'a pas of avatar custom, retourne l'avatar default Discord (couleur basée on the discriminateur/ID)

## Behavior

- `$userAvatar` ne prend **no argument**.
- The URL retournée pointe vers les CDN Discord (`cdn.discordapp.com`).
- L'avatar est l'image **global** of the user, pas celle specific to the server (voir `$userServerAvatar`).

## Examples

### Display l'avatar en grand

```bdfd
$title[Avatar of $userName]
$image[$userAvatar]
$color[#5865F2]
$sendMessage[]
```

### Display l'avatar en miniature in a profil

```bdfd
$author[$userName;$userAvatar]
$title[Profil user]
$thumbnail[$userAvatar]
$description[
**Nom :** $userName
**ID :** $userID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Les URLs of avatar Discord can be modifiedes en ajoutant `?size=256` or `?size=1024` pour changer la resolvedtion.
- Pour l'avatar specific to the server (if set), utilisez `$userServerAvatar`.
- The user peut changer son avatar to tout moment.
