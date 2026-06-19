---
layout: doc
title: $authorBanner
translation_key: docs
category: "Entity Info"
function_name: authorBanner
syntax: $authorBanner
description: Returns the URL of the profile banner of the author of the message. Reserved for Nitro subscribers.
---

# $authorBanner

The variable `$authorBanner` returns the **URL of the profile banner** of the author of the message. Banners are reserved for Discord Nitro subscribers.

## Syntax

```
$authorBanner
```

## Return value

- **Type**: Character string (URL) or empty string
- Discord CDN URL if the author has a Nitro banner
- Empty string if the author does not have a banner

## Behavior

- `$authorBanner` takes **no arguments**.
- Equivalent to `$userBanner` for text commands.
- Only Nitro subscribers can define a banner.

## Examples

### Display the banner

```bdfd
$if[$authorBanner!=]
  $title[Banner of $authorUsername]
  $image[$authorBanner]
  $color[$userBannerColor]
  $sendMessage[]
$else
  $sendMessage[$authorUsername does not have a Nitro banner.]
$endif
```

### Complete profile

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Profile of $authorUsername]
$description[**ID:** $authorID]
$image[$authorBanner]
$thumbnail[$authorAvatar]
$color[$userBannerColor]
$sendMessage[]
```

## Notes

- Always check if `$authorBanner` is not empty before using it as an embed image.
- For the accent color of the banner, use `$userBannerColor`.
