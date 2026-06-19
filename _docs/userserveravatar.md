---
layout: doc
title: $userServerAvatar
translation_key: docs
category: "Entity Info"
function_name: userServerAvatar
syntax: $userServerAvatar
description: Returns the URL of the user's server-specific avatar (per-server avatar for Nitro subscribers).
---

# $userServerAvatar

The `$userServerAvatar` function returns the **URL of the server-specific avatar** of the user. Discord Nitro subscribers can set a different avatar for each server.

## Syntax

```
$userServerAvatar
```

## Return Value

- **Type**: String (URL)
- The URL of the server-specific avatar, or the global avatar if the user has not set a per-server avatar.

## Behavior

- `$userServerAvatar` takes **no arguments**.
- If the user has set a specific avatar for this server (a Nitro feature), that URL is returned.
- Otherwise, it returns the global avatar (identical to `$userAvatar`).

## Examples

### Compare global and server avatars

```bdfd
$title[Avatars of $userName]
$description[
**Global avatar:**
**Server avatar:**
]
$thumbnail[$userAvatar]
$image[$userServerAvatar]
$color[#5865F2]
$sendMessage[]
```

### Detect a custom server avatar

```bdfd
$if[$userServerAvatar!=$userAvatar]
  $sendMessage[You have a custom avatar for this server!]
$else
  $sendMessage[You are using your global avatar.]
$endif
```

## Notes

- Customizing avatars per server is a **Discord Nitro** feature.
- If the user does not have Nitro or has not set a server avatar, `$userServerAvatar` is identical to `$userAvatar`.
- Useful for logs and moderation commands where the per-server appearance is relevant.
