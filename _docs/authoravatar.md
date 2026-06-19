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
- URL of the avatar of the author (Discord CDN)
- Default avatar if the author does not have a custom avatar

## Behavior

- `$authorAvatar` takes **no arguments**.
- Equivalent to `$userAvatar` for text commands.
- The URL points to the Discord CDN.

## Examples

### Large avatar

```bdfd
$title[Avatar of $authorUsername]
$image[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Author of embed with avatar

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Message]
$description[Message content...]
$color[#5865F2]
$sendMessage[]
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
$sendMessage[]
```

## Notes

- For the server-specific avatar, use `$userServerAvatar`.
- Parameters like `?size=` can be added to the URL to change the resolution.
- The avatar can be modified by the user at any time.
