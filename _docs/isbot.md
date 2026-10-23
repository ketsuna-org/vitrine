---
layout: doc
title: $isBot
translation_key: docs
category: "Entity Info"
function_name: isBot
syntax: $isBot[(User ID)]
description: Returns "true" if the user (the author by default) is a bot, and "false" otherwise.
---

# $isBot

The function `$isBot` allows you to know if a user (by default the one who triggered the command) is a **bot account** or a normal user account.

## Syntax

```
$isBot[(User ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `User ID` | Optional. The user to check. If omitted or empty (`$isBot`, `$isBot[]`), the command author is checked. A non-numeric or non-positive value raises `Invalid user ID.`; an unknown user raises `User not found.` |

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The account is a bot.
- `"false"`: The account is a normal user.
- Without an ID, an empty string if the host supplied neither the `author.isBot` nor the `user.isBot` context variable.

## Behavior

- Without an ID, the engine does not query Discord: it returns the text of the `author.isBot` context variable, or else of `user.isBot`, as supplied by the host. Whether webhooks count as bots depends on the host.
- With an ID, the user is looked up through Discord.

## Examples

### Simple detection

```bdfd
$if[$isBot==true]
  $sendMessage[🤖 Detection: you are a bot!]
$else
  $sendMessage[👤 You are a human user.]
$endif
```

### Check another user

```bdfd
$if[$isBot[$mentioned[1]]==true]
  $sendMessage[That user is a bot.]
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
