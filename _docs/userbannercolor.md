---
layout: doc
title: $userBannerColor
translation_key: docs
category: "Entity Info"
function_name: userBannerColor
syntax: $userBannerColor
description: Returns the couleur of accent of la banner of profil of the user to the format hexadecimal.
---

# $userBannerColor

The variable `$userBannerColor` retourne la **couleur of accent** associée to la banner of profil of the user. Cette couleur est automatically extractede par Discord from la banner.

## Syntax

```
$userBannerColor
```

## Return Value

- **Type** : String of becauseactères (hexadecimal)
- Format : `#RRGGBB` (ex: `#5865F2`)
- Si the user n'a pas of banner, retourne une string vide

## Behavior

- `$userBannerColor` ne prend **no argument**.
- The color est déterminée par Discord from la banner Nitro of the user.
- Utilisable directly in `$color[]` pour assortir visuallement the embed to the thème of the profil.

## Examples

### Embed thématique

```bdfd
$if[$userBannerColor!=]
  $title[Profil of $userName]
  $description[Les couleurs of cet embed correspondent to votre banner !]
  $color[$userBannerColor]
  $author[$userName;$userAvatar]
  $sendMessage[]
$else
  $title[Profil of $userName]
  $description[Vous n'avez pas of banner.]
  $color[#5865F2]
  $sendMessage[]
$endif
```

## Notes

- Couplé with `$userBanner`, allows create embeds to the thème custom for each user.
- Si the user n'a pas of banner, prévoyez une couleur of fallback.
