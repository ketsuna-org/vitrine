---
layout: doc
title: $authorBanner
translation_key: docs
category: "Entity Info"
function_name: authorBanner
syntax: $authorBanner
description: Returns the URL of the banner de profil de the author of the message. Réservé aux abonnés Nitro.
---

# $authorBanner

The variable `$authorBanner` returns the **URL of the banner de profil** de the author of the message. The banners sont réservées aux abonnés Discord Nitro.

## Syntax

```
$authorBanner
```

## Return value

- **Type** : String de becauseactères (URL) or string vide
- URL CDN Discord if the auteur a une banner Nitro
- String vide if the auteur does not have de banner

## Behavior

- `$authorBanner` ne prend **no argument**.
- Équivaslow à `$userBanner` for commands textuelles.
- Seuls les abonnés Nitro peuvent définir une banner.

## Examples

### Afficher la banner

```bdfd
$if[$authorBanner!=]
  $title[Banner de $authorUsername]
  $image[$authorBanner]
  $color[$userBannerColor]
  $sendMessage[]
$else
  $sendMessage[$authorUsername does not have de banner Nitro.]
$endif
```

### Profil complete

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Profil de $authorUsername]
$description[**ID :** $authorID]
$image[$authorBanner]
$thumbnail[$authorAvatar]
$color[$userBannerColor]
$sendMessage[]
```

## Notes

- Vérifiez toudays si `$authorBanner` est non vide before de l'utiliser comme image d'embed.
- For the couleur d'accent de la banner, use `$userBannerColor`.
