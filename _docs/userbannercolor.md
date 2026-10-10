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

The `$userBannerColor` function returns the **profile accent color** of the given Discord user (the engine reads the `accentColor` of the user, which Discord also exposes as the banner color).

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
- An empty string if the user has no accent color (the value is not available).

## Behavior

- `$userBannerColor` requires one argument: used without argument it is invalid.
- The value is the 24-bit color number in hexadecimal, left-padded with zeros to 6 digits and upper-cased.
- `$color[]` accepts a 6-digit hexadecimal value with or without `#`.

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

- If the user has no banner color, make sure to provide a fallback color.
