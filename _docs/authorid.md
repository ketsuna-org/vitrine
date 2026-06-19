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
- The unique ID of the message author

## Behavior

- `$authorID` takes **no arguments**.
- In the context of a text command, `$authorID` is the ID of the person who sent the message.
- In most simple cases, `$authorID` and `$userID` are identical.

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
$sendMessage[]
```

### Owner verification

```bdfd
$if[$authorID==123456789012345678]
  $sendMessage[Hello owner!]
$endif
```

## Notes

- `$authorID` is the ID of the **author of the message**, whereas `$userID` is the ID of the **triggering user**. In text commands, they are identical.
- Use `$authorID` for better semantic clarity in message-related code.
