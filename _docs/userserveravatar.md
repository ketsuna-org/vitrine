---
layout: doc
title: $userServerAvatar
translation_key: docs
category: "Entity Info"
function_name: userServerAvatar
syntax: $userServerAvatar[userID]
description: Returns the URL of the member's server-specific avatar, or their global avatar if none is set.
---

# $userServerAvatar

The `$userServerAvatar` function returns the **URL of the server-specific avatar** of a member. Discord Nitro subscribers can set a different avatar for each server.

## Syntax

```
$userServerAvatar[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The ID of the user (digits only, greater than 0). Otherwise `Invalid user ID.` is raised. |

`$userServerAvatar` without brackets, or with more than one argument, is refused ("Invalid argument count").

## Return Value

- **Type**: String (URL)
- The URL of the member's server-specific avatar, or the global avatar of the user if the member has no server avatar.

## Behavior

- The user must be a member of the server, otherwise the error `User is not a member of this guild.` is raised.
- If the member has no server-specific avatar, the global avatar of the user is returned (as `$userAvatar[userID]`).

## Examples

### Compare global and server avatars

```bdfd
$title[Avatars of $username]
$thumbnail[$userAvatar[$authorID]]
$image[$userServerAvatar[$authorID]]
$color[#5865F2]
```

### Detect a custom server avatar

```bdfd
$if[$userServerAvatar[$authorID]!=$userAvatar[$authorID]]
  $sendMessage[You have a custom avatar for this server!]
$else
  $sendMessage[You are using your global avatar.]
$endif
```

## Notes

- Customizing avatars per server is a **Discord Nitro** feature.
- `$authorAvatar` is the zero-argument equivalent for the global avatar of the author.
