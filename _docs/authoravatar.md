---
layout: doc
title: $authorAvatar
translation_key: docs
category: "Entity Info"
function_name: authorAvatar
syntax: $authorAvatar
description: Returns the URL of the global avatar of the author of the message that triggered the command.
---

# $authorAvatar

The variable `$authorAvatar` returns the **URL of the global avatar** of the author of the message that triggered the command.

## Syntax

```
$authorAvatar
```

## Return value

- **Type**: Character string (URL)
- URL of the avatar of the author (Discord CDN), read from Discord for the author's user ID
- The default avatar URL if the author does not have a custom avatar

## Behavior

- `$authorAvatar` takes **no arguments** (passing one is an error).
- Returns the same value as `$userAvatar[$authorID]` (`$userAvatar` requires a user ID).
- It is the global avatar, not the server avatar.
- If the author ID is missing from the context or the user cannot be found, the error `Invalid user ID.` / `User not found.` is raised.

## Examples

### Large avatar

```bdfd
$title[Avatar of $authorUsername]
$image[$authorAvatar]
$color[#5865F2]
```

### Author of embed with avatar

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Message]
$description[Message content...]
$color[#5865F2]
```

### Complete profile

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Profile of $authorUsername]
$thumbnail[$authorAvatar]
$description[
**Name:** $authorUsername
**ID:** $authorID
]
$color[#5865F2]
```

## Notes

- For the server-specific avatar, use `$userServerAvatar`.
- The avatar can be modified by the user at any time.
