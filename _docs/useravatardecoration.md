---
layout: doc
title: $userAvatarDecoration
translation_key: docs
category: "Entity Info"
function_name: userAvatarDecoration
syntax: $userAvatarDecoration[userID;(format)]
description: Returns the URL of the avatar decoration of a user, or an empty string if they have none. Bot Creator function, not in BDFD.
---

# $userAvatarDecoration

The `$userAvatarDecoration` function returns the **URL of the avatar decoration** (the frame drawn around the avatar) of a user. It is ready to use: no need to build the CDN URL from a hash. This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$userAvatarDecoration[userID;(format)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the user (digits only, greater than 0). Otherwise `Invalid user ID.` is raised. |
| `format` | Optional - `png` or `webp`. Empty or absent: `png`. Another value raises `Invalid image format`. |

## Return Value

- **Type**: String (URL) or empty string
- The URL of the decoration image.
- An empty string if the user has no avatar decoration.

## Examples

### Tell whether a user has a decoration

```bdfd
$if[$userAvatarDecoration[$authorID]!=]
  $sendMessage[You wear an avatar decoration.]
$else
  $sendMessage[No avatar decoration.]
$endif
```

## Notes

- Animated decorations are animated PNG images. For the decoration of the server profile, use `$userServerAvatarDecoration`.
- Errors: `Invalid user ID.` and `User not found.`
- In a JavaScript bot (discord.js): `user.avatarDecorationURL()`, `null` when there is none.
