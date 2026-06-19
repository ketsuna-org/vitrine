---
layout: doc
title: $userBannerColor
translation_key: docs
category: "Entity Info"
function_name: userBannerColor
syntax: $userBannerColor
description: Returns the couleur d'accent de la banner de profil of the user au format hexadecimal.
---

# $userBannerColor

The variable `$userBannerColor` retourne la **couleur d'accent** associée à la banner de profil of the user. Cette couleur est automatically extractede par Discord from la banner.

## Syntax

```
$userBannerColor
```

## Return Value

- **Type** : String de becauseactères (hexadecimal)
- Format : `#RRGGBB` (ex: `#5865F2`)
- Si the user n'a pas de banner, retourne une string vide

## Behavior

- `$userBannerColor` ne prend **no argument**.
- The color est déterminée par Discord from la banner Nitro of the user.
- Utilisable directly dans `$color[]` pour assortir visuellement the embed au thème du profil.

## Examples

### Embed thématique

```bdfd
$if[$userBannerColor!=]
  $title[Profil de $userName]
  $description[Les couleurs de cet embed correspondent à votre banner !]
  $color[$userBannerColor]
  $author[$userName;$userAvatar]
  $sendMessage[]
$else
  $title[Profil de $userName]
  $description[Vous n'avez pas de banner.]
  $color[#5865F2]
  $sendMessage[]
$endif
```

## Notes

- Couplé avec `$userBanner`, allows créer embeds au thème custom for each user.
- Si the user n'a pas de banner, prévoyez une couleur de fallback.
