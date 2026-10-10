---
layout: doc
title: $authorTag
translation_key: docs
category: "Entity Info"
function_name: authorTag
syntax: $authorTag
description: "Returns the tag of the author: username#discriminator when the account has a discriminator, otherwise the username alone."
---

# $authorTag

The variable `$authorTag` returns the **complete tag** of the author of the message. It is the equivalent of `$userTag[$authorID]` but explicitly linked to the author of the command.

## Syntax

```
$authorTag
```

## Return value

- **Type**: Character string
- `username#discriminator` when the discriminator supplied by the command context is not `0` / `0000`
- The username alone for accounts without a discriminator (new accounts)
- If the context has no username or tag, the author is read from Discord: bots then give `username#NNNN` (4 digits, zero padded) and other users give the username alone

## Behavior

- `$authorTag` takes **no arguments** (passing one is an error).
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
```

## Notes

- The `username#discriminator` format is obsolete for new Discord accounts.
- For reliable identification, use `$authorID`.
- `$userTag` takes an optional user ID and always reads the user from Discord (bots give `username#NNNN`, other users the username alone).
