---
layout: doc
title: $userAvatar
translation_key: docs
category: "Entity Info"
function_name: userAvatar
syntax: $userAvatar[userID;(size);(format)]
description: Returns the global avatar URL of a user. For the author of the command, use $authorAvatar.
---

# $userAvatar

The function `$userAvatar[]` returns the **global avatar URL** of the given user.

## Syntax

```
$userAvatar[userID;(size);(format)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the user. An invalid ID, or an unknown user, raises an error. |
| `size` | Optional - Image size in pixels: a power of two from 16 to 4096 (`16`, `32`, ..., `4096`). Empty or absent: Discord's default size. Added to the URL as `?size=`. Another value raises `Invalid image size`. |
| `format` | Optional - `png`, `jpg`, `jpeg`, `webp` or `gif`. Empty or absent: `png`, or `gif` for an animated image. `gif` on a static image keeps its default format. Another value raises `Invalid image format`. |

## Return Value

- **Type**: String (URL)
- The avatar URL of the user (`avatar.url` of the Discord user).

## Behavior

- `$userAvatar` requires one argument: used without argument it is invalid. For the author of the command, use `$authorAvatar` (no argument).
- The avatar is the **global** image of the user, not the server-specific one (see `$userServerAvatar`).

## Examples

### Display Avatar in Large

```bdfd
$title[Avatar of $userName]
$image[$authorAvatar]
$color[#5865F2]
$sendMessage[Avatar]
```

### Display Avatar as Thumbnail in a Profile

```bdfd
$author[$userName]
$authorIcon[$authorAvatar]
$title[User Profile]
$thumbnail[$authorAvatar]
$description[
**Name:** $userName
**ID:** $userID
]
$color[#5865F2]
$sendMessage[Profile]
```

## Notes

- For the server-specific avatar (if set), use `$userServerAvatar`.
- For the avatar of the command author without argument, use `$authorAvatar`.
