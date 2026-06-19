---
layout: doc
title: $userBanner
translation_key: docs
category: "Entity Info"
function_name: userBanner
syntax: $userBanner
description: Returns the URL of the profile banner of the user who triggered the command.
---

# $userBanner

The `$userBanner` function returns the **URL of the profile banner** of the user. The banner is the background image that appears on Discord profiles (reserved for Nitro subscribers).

## Syntax

```
$userBanner
```

## Return Value

- **Type**: String (URL) or empty string
- If the user has a Nitro banner, it returns its Discord CDN URL.
- If the user does not have a banner, it returns an empty string.

## Behavior

- `$userBanner` takes **no arguments**.
- Banners are a feature reserved for **Discord Nitro** subscribers.
- If no banner is set, the function returns an empty string.

## Examples

### Display the banner if it exists

```bdfd
$if[$userBanner!=]
  $title[Banner of $userName]
  $image[$userBanner]
  $color[$userBannerColor]
  $sendMessage[]
$else
  $sendMessage[$userName does not have a profile banner.]
$endif
```

### Complete profile with banner

```bdfd
$title[Profile of $userName]
$description[
**Name:** $userName
**ID:** $userID
]
$image[$userBanner]
$thumbnail[$userAvatar]
$color[$userBannerColor]
$sendMessage[]
```

## Notes

- Only users with a **Discord Nitro** subscription can set a banner.
- Always check if `$userBanner` is not empty before using it as an image.
- `$userBannerColor` returns the accent color associated with the banner.
