---
layout: doc
title: $userServerAvatarDecoration
translation_key: docs
category: "Entity Info"
function_name: userServerAvatarDecoration
syntax: $userServerAvatarDecoration[userID;(format)]
description: Returns the URL of the avatar decoration of the member's server profile, or an empty string if they have none. Bot Creator function, not in BDFD.
---

# $userServerAvatarDecoration

The `$userServerAvatarDecoration` function returns the **URL of the avatar decoration of a member's server profile**. It reads the member of the server, not the global profile of the user. This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$userServerAvatarDecoration[userID;(format)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the member (digits only, greater than 0). Otherwise `Invalid user ID.` is raised. |
| `format` | Optional - `png` or `webp`. Empty or absent: `png`. Another value raises `Invalid image format`. |

## Return Value

- **Type**: String (URL) or empty string
- The URL of the decoration image of the member.
- An empty string if the member has no server avatar decoration. The global decoration (`$userAvatarDecoration`) is never substituted.

## Behavior

- The user must be a member of the server, otherwise the error `User is not a member of this guild.` is raised.

## Examples

```bdfd
$if[$userServerAvatarDecoration[$authorID]!=]
  $thumbnail[$userServerAvatarDecoration[$authorID]]
$endif
$sendMessage[Server decoration]
```

## Notes

- In a JavaScript bot (discord.js): `member.avatarDecorationURL()`, `null` when there is none.
