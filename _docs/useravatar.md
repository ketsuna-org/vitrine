---
layout: doc
title: $userAvatar
translation_key: docs
category: "Entity Info"
function_name: userAvatar
syntax: $userAvatar
description: Returns the global avatar URL of the user who triggered the command.
---

# $userAvatar

The variable `$userAvatar` returns the **global avatar URL** of the user who triggered the command.

## Syntax

```
$userAvatar
```

## Return Value

- **Type**: String (URL)
- URL of the Discord avatar image in PNG or WebP format
- If the user does not have a custom avatar, returns the default Discord avatar (color based on the discriminator/ID)

## Behavior

- `$userAvatar` takes **no arguments**.
- The returned URL points to the Discord CDN (`cdn.discordapp.com`).
- The avatar is the **global** image of the user, not the server-specific one (see `$userServerAvatar`).

## Examples

### Display Avatar in Large

```bdfd
$title[Avatar of $userName]
$image[$userAvatar]
$color[#5865F2]
$sendMessage[]
```

### Display Avatar as Thumbnail in a Profile

```bdfd
$author[$userName;$userAvatar]
$title[User Profile]
$thumbnail[$userAvatar]
$description[
**Name:** $userName
**ID:** $userID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Discord avatar URLs can be modified by adding `?size=256` or `?size=1024` to change the resolution.
- For the server-specific avatar (if set), use `$userServerAvatar`.
- The user can change their avatar at any time.
