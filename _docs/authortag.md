---
layout: doc
title: $authorTag
translation_key: docs
category: "Entity Info"
function_name: authorTag
syntax: $authorTag
description: Returns the complete tag of the author of the message (format "username#discriminator" or simple username for new accounts).
---

# $authorTag

The variable `$authorTag` returns the **complete tag** of the author of the message. This is the equivalent of `$userTag` but explicitly linked to the author of the message.

## Syntax

```
$authorTag
```

## Return value

- **Type**: Character string
- Old format: `username#discriminator` for legacy accounts
- New format: simply the username for new accounts

## Behavior

- `$authorTag` takes **no arguments**.
- Equivalent to `$userTag` in the context of a text command.
- For new accounts, the tag is identical to the username.

## Examples

### Profile of the author

```bdfd
$title[Profile of $authorTag]
$author[$authorUsername;$authorAvatar]
$description[
**Name:** $authorUsername
**Tag:** $authorTag
**ID:** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- The `username#discriminator` format is obsolete for new Discord accounts.
- For reliable identification, use `$authorID`.
- `$authorTag` and `$userTag` are generally identical in text commands.
