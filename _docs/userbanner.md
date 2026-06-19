---
layout: doc
title: $userBanner
translation_key: docs
category: "Entity Info"
function_name: userBanner
syntax: $userBanner
description: Returns the URL of the banner of profil of the user qui triggered the command.
---

# $userBanner

The variable `$userBanner` retourne l'**URL of the banner of profil** of the user. The banner est l'image of arrière-plan qui apparaît on the profils Discord (réservée to the abonnés Nitro).

## Syntax

```
$userBanner
```

## Return Value

- **Type** : String of becauseactères (URL) or string vide
- Si the user a une banner Nitro, retourne son URL CDN Discord
- Si the user n'a pas of banner, retourne une string vide

## Behavior

- `$userBanner` ne prend **no argument**.
- Les banners sont une functionnalité réservée to the abonnés **Discord Nitro**.
- Si noe banner n'est définie, the variable retourne une string vide.

## Examples

### Display la banner si elle existe

```bdfd
$if[$userBanner!=]
  $title[Banner of $userName]
  $image[$userBanner]
  $color[$userBannerColor]
  $sendMessage[]
$else
  $sendMessage[$userName n'a pas of banner of profil.]
$endif
```

### Profil complete with banner

```bdfd
$title[Profil of $userName]
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

- Seuls les users with a abonnement **Discord Nitro** can define ae banner.
- Vérifiez toudays si `$userBanner` est non vide before of l'use like image.
- `$userBannerColor` retourne the color of accent associée to la banner.
