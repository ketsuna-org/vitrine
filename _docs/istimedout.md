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
| `userID` | Required. The Discord ID of the member to check. An invalid ID raises an error. |

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The user is timed out
- `"false"`: The user is not timed out

## Behavior

- `$isTimedOut` takes **exactly one argument**, the user ID; a bare `$isTimedOut` is invalid.
- It returns `"true"` only if the member has a timeout end date that is still in the future.
- The timeout is a Discord feature that temporarily prevents a member from speaking or sending messages.
- The duration of the timeout is defined by the moderators (up to 28 days).

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

- The timeout is a **temporary** sanction (maximum 28 days).
- A timed-out user cannot send messages, join voice channels, or react.
- Useful for preventing sanctioned users from using the bot's commands.
