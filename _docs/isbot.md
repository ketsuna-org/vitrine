---
layout: doc
title: $isBot
translation_key: docs
category: "Entity Info"
function_name: isBot
syntax: $isBot
description: Returns "true" if the user who triggered the command is a bot, and "false" otherwise.
---

# $isBot

The function `$isBot` allows you to know if the user who triggered the command is a **bot account** or a normal user account.

## Syntax

```
$isBot
```

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The account is a bot.
- `"false"`: The account is a normal user.
- An empty string if the host supplied neither the `author.isBot` nor the `user.isBot` context variable.

## Behavior

- `$isBot` takes **no arguments**.
- The engine does not query Discord: it returns the text of the `author.isBot` context variable, or else of `user.isBot`, as supplied by the host. Whether webhooks count as bots depends on the host.

## Examples

### Simple detection

```bdfd
$if[$isBot==true]
  $sendMessage[🤖 Detection: you are a bot!]
$else
  $sendMessage[👤 You are a human user.]
$endif
```

### Ignore bots

```bdfd
$if[$isBot==true]
  $stop
$endif
$sendMessage[Welcome $userName!] 
```

### Conditional logging

```bdfd
$if[$isBot==true]
  $log[Command executed by the bot $userName (ID: $userID)]
$else
  $log[Command executed by the user $userName (ID: $userID)]
$endif
```

## Notes

- Very useful for preventing bots from executing certain commands (anti-looping).
- Typically used with `$stop` to silently ignore executions triggered by other bots.
- Comparisons with `==` are case-sensitive: compare with lowercase `true`.
