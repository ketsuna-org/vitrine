---
layout: doc
title: $userBannerColor
translation_key: docs
category: "Entity Info"
function_name: userBannerColor
syntax: $userBannerColor
description: Returns the accent color of the profile banner of the user in hexadecimal format.
---

# $userBannerColor

The `$userBannerColor` function returns the **accent color** associated with the profile banner of the user. This color is automatically extracted by Discord from the banner.

## Syntax

```
$userBannerColor
```

## Return Value

- **Type**: String (hexadecimal)
- Format: `#RRGGBB` (e.g., `#5865F2`)
- If the user does not have a banner, it returns an empty string.

## Behavior

- `$userBannerColor` takes **no arguments**.
- The color is determined by Discord from the user's Nitro banner.
- Can be used directly in `$color[]` to visually match the embed to the profile's theme.

## Examples

### Themed embed

```bdfd
$if[$userBannerColor!=]
  $title[Profile of $userName]
  $description[The colors of this embed match your banner!]
  $color[$userBannerColor]
  $author[$userName;$userAvatar]
  $sendMessage[]
$else
  $title[Profile of $userName]
  $description[You do not have a banner.]
  $color[#5865F2]
  $sendMessage[]
$endif
```

## Notes

- Coupled with `$userBanner`, it allows you to create embeds with a custom theme for each user.
- If the user does not have a banner, make sure to provide a fallback color.
