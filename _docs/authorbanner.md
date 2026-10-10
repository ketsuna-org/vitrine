---
layout: doc
title: $authorBanner
translation_key: docs
category: "Entity Info"
function_name: authorBanner
syntax: $authorBanner
description: Returns the URL of the profile banner of the author of the message, or an empty string if there is none.
---

# $authorBanner

The variable `$authorBanner` returns the **URL of the profile banner** of the author of the message.

## Syntax

```
$authorBanner
```

## Return value

- **Type**: Character string (URL) or empty string
- The banner URL if the author has a banner (taken from the command context, or read from Discord when the context has none)
- Empty string if the author does not have a banner

## Behavior

- `$authorBanner` takes **no arguments** (passing one is an error).
- Returns the banner of the author; `$userBanner[userID]` does the same for a given user ID.

## Examples

### Display the banner

```bdfd
$if[$authorBanner!=]
  $title[Banner of $authorUsername]
  $image[$authorBanner]
  $color[$userBannerColor[$authorID]]
$else
  $sendMessage[$authorUsername does not have a banner.]
$endif
```

### Complete profile

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Profile of $authorUsername]
$description[**ID:** $authorID]
$image[$authorBanner]
$thumbnail[$authorAvatar]
$color[$userBannerColor[$authorID]]
```

## Notes

- Always check if `$authorBanner` is not empty before using it as an embed image.
- For the accent color of the banner, use `$userBannerColor[userID]`: it returns 6 uppercase hex digits without `#`, or an empty string when the user has none.
