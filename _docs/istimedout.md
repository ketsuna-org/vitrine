---
layout: doc
title: $isTimedOut
translation_key: docs
category: "Entity Info"
function_name: isTimedOut
syntax: $isTimedOut[userID]
description: Returns "true" if the given user is currently timed out (temporarily muted) on the server, "false" otherwise.
---

# $isTimedOut

The function `$isTimedOut[userID]` returns `"true"` if the given user is currently **timed out** (temporarily muted) on the server.

## Syntax

```
$isTimedOut[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required. The Discord ID of the member to check. An ID that is not a positive integer raises `Invalid user ID.` |

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The user is timed out
- `"false"`: The user is not timed out

## Behavior

- `$isTimedOut` takes **exactly one argument**, the user ID; a bare `$isTimedOut` is invalid.
- It returns `"true"` only if the member has a timeout end date that is still in the future.
- A user who is not a member of the server raises the error `User is not a member of this guild.`

## Examples

### Block commands for timed-out users

```bdfd
$if[$isTimedOut[$authorID]==true]
  $sendMessage[⏳ You are currently timed out. Please wait.]
  $stop
$endif
$sendMessage[Command executed successfully!]
```

### Moderation check

```bdfd
$title[Timeout Check]
$description[
**User:** $username
**Timed Out:** $isTimedOut[$authorID]
]
$color[#ED4245]
```

## Notes

- Useful for preventing sanctioned users from using the bot's commands.
