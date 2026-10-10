---
layout: doc
title: $userBannerColor
translation_key: docs
category: "Entity Info"
function_name: userBannerColor
syntax: $userBannerColor[userID]
description: Returns the banner color of a user in hexadecimal format (RRGGBB, without #).
---

# $userBannerColor

The `$userBannerColor` function returns the **banner color** (banner color of the Discord user) of the given user.

## Syntax

```
$userBannerColor[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the user. An invalid ID, or an unknown user, raises an error. |

## Return Value

- **Type**: String (hexadecimal)
- Format: `RRGGBB` in upper case, **without** `#` (e.g., `5865F2`)
- An empty string if the user has no banner color.

## Behavior

- `$userBannerColor` requires one argument: used without argument it is invalid.
- Can be used directly in `$color[]` (which accepts hexadecimal with or without `#`).

## Examples

### Themed embed

```bdfd
$if[$userBannerColor[$authorID]!=]
  $title[Profile of $userName]
  $description[The colors of this embed match your banner!]
  $color[$userBannerColor[$authorID]]
  $author[$userName;$authorAvatar]
  $sendMessage[Profile]
$else
  $title[Profile of $userName]
  $description[You do not have a banner.]
  $color[#5865F2]
  $sendMessage[Profile]
$endif
```

## Notes

- Coupled with `$userBanner[]`, it allows you to create embeds with a custom theme for each user.
- If the user has no banner color, make sure to provide a fallback color.
