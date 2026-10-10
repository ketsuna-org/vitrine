---
layout: doc
title: $userBanner
translation_key: docs
category: "Entity Info"
function_name: userBanner
syntax: $userBanner[userID]
description: Returns the URL of the profile banner of a user. For the author of the command, use $authorBanner.
---

# $userBanner

The `$userBanner` function returns the **URL of the profile banner** of the given user.

## Syntax

```
$userBanner[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the user. An invalid ID, or an unknown user, raises an error. |

## Return Value

- **Type**: String (URL) or empty string
- The URL of the banner if the user has one.
- An empty string if the user has no banner.

## Behavior

- `$userBanner` requires one argument: used without argument it is invalid. For the author of the command, use `$authorBanner` (no argument).
- If no banner is set, the function returns an empty string.

## Examples

### Display the banner if it exists

```bdfd
$if[$authorBanner!=]
  $title[Banner of $userName]
  $image[$authorBanner]
  $color[$userBannerColor[$authorID]]
  $sendMessage[Banner]
$else
  $sendMessage[$userName does not have a profile banner.]
$endif
```

### Profile with avatar

```bdfd
$title[Profile of $userName]
$description[
**Name:** $userName
**ID:** $userID
]
$thumbnail[$authorAvatar]
$sendMessage[Profile]
```

## Notes

- Check that the banner is not empty before using it as an image.
- `$userBannerColor[userID]` returns the accent color of the same user (a different value from the banner image).
- Errors: `Invalid user ID.` (not digits only / zero) and `User not found.`
