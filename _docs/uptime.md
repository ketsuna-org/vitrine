---
layout: doc
title: $uptime[]
translation_key: docs
category: "Misc"
function_name: uptime
syntax: $uptime
description: Returns the elapsed time since the bot started, formatted as HH:MM:SS.
---

# $uptime[]

The function `$uptime[]` returns the time elapsed since the bot started, formatted as `HH:MM:SS`. It is computed from the `bot.uptime` context variable (milliseconds).

## Syntax

```
$uptime
```

> **Note:** This function takes no parameters.

## Return Value

A string of the form `HH:MM:SS`, each part padded to at least two digits, for example `02:15:30` or `00:00:45`.

- Hours are not wrapped at 24: after 3 days the value reads `72:00:00`.
- Milliseconds are dropped (truncated to whole seconds).
- If the host provides no `bot.uptime` value (or a negative one), the result is `00:00:00`.

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

- The uptime is measured since the bot session started, so it is reset on each bot restart.
- The format is always `HH:MM:SS`; it never shows days or words.
- `$uptime` takes no argument; any argument is refused ("Invalid argument count").
- For the latency value, see `$ping[]`.
