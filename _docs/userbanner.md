---
layout: doc
title: $userBanner
translation_key: docs
category: "Entity Info"
function_name: userBanner
syntax: $userBanner
description: Returns the URL of the banner de profil of the user qui a déclenché the command.
---

# $userBanner

The variable `$userBanner` retourne l'**URL of the banner de profil** of the user. The banner est l'image d'arrière-plan qui apparaît sur les profils Discord (réservée aux abonnés Nitro).

## Syntax

```
$userBanner
```

## Return Value

- **Type** : String de becauseactères (URL) or string vide
- Si the user a une banner Nitro, retourne son URL CDN Discord
- Si the user n'a pas de banner, retourne une string vide

## Behavior

- `$userBanner` ne prend **no argument**.
- Les banners sont une functionnalité réservée aux abonnés **Discord Nitro**.
- Si noe banner n'est définie, the variable retourne une string vide.

## Examples

### Afficher la banner si elle existe

```bdfd
$if[$userBanner!=]
  $title[Banner de $userName]
  $image[$userBanner]
  $color[$userBannerColor]
  $sendMessage[]
$else
  $sendMessage[$userName n'a pas de banner de profil.]
$endif
```

### Profil complete avec banner

```bdfd
$title[Profil de $userName]
$description[
**Nom :** $userName
**ID :** $userID
]
$image[$userBanner]
$thumbnail[$userAvatar]
$color[$userBannerColor]
$sendMessage[]
```

## Notes

- Seuls les users with a abonnement **Discord Nitro** peuvent définir une banner.
- Vérifiez toudays si `$userBanner` est non vide before de l'utiliser comme image.
- `$userBannerColor` retourne the color d'accent associée à la banner.
