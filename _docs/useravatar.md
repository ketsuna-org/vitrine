---
layout: doc
title: $userAvatar
translation_key: docs
category: "Entity Info"
function_name: userAvatar
syntax: $userAvatar
description: Returns the URL of the avatar global of the user qui a déclenché the command.
---

# $userAvatar

The variable `$userAvatar` retourne l'**URL of the avatar global** of the user qui a déclenché the command.

## Syntax

```
$userAvatar
```

## Return Value

- **Type** : String de becauseactères (URL)
- URL of the image d'avatar Discord au format PNG or WebP
- Si the user n'a pas d'avatar custom, retourne l'avatar default Discord (couleur basée sur le discriminateur/ID)

## Behavior

- `$userAvatar` ne prend **no argument**.
- The URL retournée pointe vers les CDN Discord (`cdn.discordapp.com`).
- L'avatar est l'image **global** of the user, pas celle spécifique au server (voir `$userServerAvatar`).

## Examples

### Afficher l'avatar en grand

```bdfd
$title[Avatar de $userName]
$image[$userAvatar]
$color[#5865F2]
$sendMessage[]
```

### Afficher l'avatar en miniature dans un profil

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

- Les URLs d'avatar Discord can be modifiedes en ajoutant `?size=256` or `?size=1024` pour changer la resolvedtion.
- Pour l'avatar spécifique au server (if set), utilisez `$userServerAvatar`.
- The user peut changer son avatar à tout moment.
