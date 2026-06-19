---
layout: doc
title: $isTimedOut
translation_key: docs
category: "Entity Info"
function_name: isTimedOut
syntax: $isTimedOut
description: Returns "true" if the user is currently timed out (temporarily muted) on the server, "false" otherwise.
---

# $isTimedOut

The variable `$isTimedOut` returns `"true"` if the user is currently **timed out** (temporarily muted) on the server.

## Syntax

```
$isTimedOut
```

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The user is timed out
- `"false"`: The user is not timed out

## Behavior

- `$isTimedOut` takes **no arguments**.
- The timeout is a Discord feature that temporarily prevents a member from speaking or sending messages.
- The duration of the timeout is defined by the moderators (up to 28 days).

## Examples

### Block commands for timed-out users

```bdfd
$if[$isTimedOut==true]
  $sendMessage[⏳ You are currently timed out. Please wait.]
  $stop
$endif
$sendMessage[Command executed successfully!]
```

### Moderation check

```bdfd
$title[Timeout Check]
$description[
**User:** $userName
**Timed Out:** $isTimedOut
]
$color[#ED4245]
$sendMessage[]
```

## Notes

- The timeout is a **temporary** sanction (maximum 28 days).
- A timed-out user cannot send messages, join voice channels, or react.
- Useful for preventing sanctioned users from using the bot's commands.
