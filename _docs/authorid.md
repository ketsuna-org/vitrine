---
layout: doc
title: $authorID
translation_key: docs
category: "Entity Info"
function_name: authorID
syntax: $authorID
description: Returns the Discord ID of the author of the message that triggered the command.
---

# $authorID

The variable `$authorID` returns the **Discord ID** of the author of the message that triggered the execution of the command.

## Syntax

```
$authorID
```

## Return value

- **Type**: Snowflake (numeric string of 17-19 digits)
- The unique ID of the author, read from the command context (`author.id`, or `user.id` if absent)
- An empty string if the context holds neither

## Behavior

- `$authorID` takes **no arguments** (passing one is an error).
- It is the ID of the person who triggered the command, as supplied by the command context. No request is made to Discord.
- `$userID` reads the same two context values in the opposite order (`user.id`, then `author.id`), so in most cases they are identical.

## Examples

### Profile of the author

```bdfd
$title[Profile of $authorUsername]
$author[$authorUsername;$authorAvatar]
$description[
**ID:** $authorID
**Tag:** $authorTag
]
$color[#5865F2]
```

### Owner verification

```bdfd
$if[$authorID==123456789012345678]
  $sendMessage[Hello owner!]
$endif
```

## Notes

- Use `$authorID` for better semantic clarity in message-related code.
