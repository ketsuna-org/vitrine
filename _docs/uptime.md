---
layout: doc
title: $uptime[]
translation_key: docs
category: "Misc"
function_name: uptime
syntax: $uptime
description: Returns the elapsed time since the bot started.
---

# $uptime[]

The function `$uptime[]` returns the elapsed time since the last start (or restart) of the bot.

## Syntax

```
$uptime
```

> **Note:** This function takes no parameters.

## Return Value

A formatted string indicating the uptime duration, for example:

- `2 hours, 15 minutes, 30 seconds`
- `3 days, 5 hours, 42 minutes`
- `45 seconds`

The exact format may vary according to the duration.

## Examples

### Simple uptime

```bdfd
The bot has been online for $uptime.
```

### Status embed

```bdfd
$title[📊 Bot Status]
$addField[⏱️ Uptime;$uptime]
$addField[🏓 Ping;$ping ms]
$color[#5865F2]
```

### Complete info command

```bdfd
$title[🤖 Information]
$description[
**Uptime:** $uptime
**Ping:** $ping ms
**Servers:** $guildCount
**Users:** $allMembersCount
]
```

## Notes

- The uptime is reset on each bot restart.
- The output format is automatically adapted to the duration (seconds, minutes, hours, days).
- For bot latency, use `$ping[]`.
