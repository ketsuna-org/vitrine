---
layout: doc
title: $userAvatar
translation_key: docs
category: "Entity Info"
function_name: userAvatar
syntax: $userAvatar[userID]
description: Returns the global avatar URL of a user. For the author of the command, use $authorAvatar.
---

# $userAvatar

The function `$userAvatar[]` returns the **global avatar URL** of the given user.

## Syntax

```
$userAvatar[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the user. An invalid ID, or an unknown user, raises an error. |

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
$author[$userName;$authorAvatar]
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
