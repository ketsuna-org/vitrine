---
layout: doc
title: $authorBanner
translation_key: docs
category: "Entity Info"
function_name: authorBanner
syntax: $authorBanner
description: Returns the URL of the banner of profil of the author of the message. Réservé to the abonnés Nitro.
---

# $authorBanner

The variable `$authorBanner` returns the **URL of the banner of profil** of the author of the message. The banners sont réservées to the abonnés Discord Nitro.

## Syntax

```
$authorBanner
```

## Return value

- **Type** : String of becauseactères (URL) or string vide
- URL CDN Discord if the auteur a une banner Nitro
- String vide if the auteur does not have of banner

## Behavior

- `$authorBanner` ne prend **no argument**.
- Équivaslow to `$userBanner` for commands textuelles.
- Seuls les abonnés Nitro can define ae banner.

## Examples

### Display la banner

```bdfd
$if[$authorBanner!=]
  $title[Banner of $authorUsername]
  $image[$authorBanner]
  $color[$userBannerColor]
  $sendMessage[]
$else
  $sendMessage[$authorUsername does not have of banner Nitro.]
$endif
```

### Profil complete

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Profil of $authorUsername]
$description[**ID :** $authorID]
$image[$authorBanner]
$thumbnail[$authorAvatar]
$color[$userBannerColor]
$sendMessage[]
```

## Notes

- Vérifiez toudays si `$authorBanner` est non vide before of l'use like image of embed.
- For the couleur of accent of la banner, use `$userBannerColor`.
