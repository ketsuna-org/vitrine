---
layout: doc
title: $authorUsername
translation_key: docs
category: "Entity Info"
function_name: authorUsername
syntax: $authorUsername
description: Returns the username of the author of the command, as supplied by the command context.
---

# $authorUsername

The variable `$authorUsername` returns the **username** (account name) of the author who triggered the command.

## Syntax

```
$authorUsername
```

## Return value

- **Type**: Character string
- The username of the author, read from the command context (`author.username`, or `user.username` if absent)
- An empty string if the context holds neither

## Behavior

- `$authorUsername` takes **no arguments** (passing one is an error).
- It is the account username, not the server nickname. No request is made to Discord.
- `$username` reads the same two context values in the opposite order (`user.username`, then `author.username`) when called without argument, and accepts an optional user ID.

## Examples

### Message from the author

```bdfd
$title[Command executed]
$author[$authorUsername;$authorAvatar]
$description[
**Author:** $authorUsername#$discriminator[$authorID]
**ID:** $authorID
]
$color[#5865F2]
```

## Notes

- To get the server nickname of the author, use `$nickname`; `$displayName` gives the global display name of a user.
- `$authorUsername` is useful for explicitly referencing the author of the message in logs or embeds.
- In most cases, `$username` and `$authorUsername` are interchangeable.
