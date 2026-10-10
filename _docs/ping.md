---
layout: doc
title: $ping[]
translation_key: docs
category: "Misc"
function_name: ping
syntax: $ping
description: Returns the value of the bot.ping context variable (latency in milliseconds), or 0 when the host provides none.
---

# $ping[]

The `$ping[]` function returns the value of the `bot.ping` variable of the execution context, meant as the bot's latency in milliseconds (ms). It does not measure anything itself: the engine makes no network request.

## Syntax

```
$ping
```

> **Note:** This function takes no parameters.

## Return Value

The text of the `bot.ping` context variable, or `0` when that variable is absent. The engine's standard command execution fills `bot.ping` with `0` (no caller passes a measured latency), so in practice `$ping` returns `0` unless the host running the script supplies a real value.

## Examples

### Simple ping command

```bdfd
🏓 Pong! Latency: $ping ms
```

### Detailed embed

```bdfd
$title[🏓 Pong!]
$description[Latency: **$ping ms**]
$color[#5865F2]
$footer[🤖 $username]
```

### Visual indicator

```bdfd
$if[$ping<100]
🟢 | $ping ms
$elseif[$ping<200]
🟡 | $ping ms
$else
🔴 | $ping ms
$endif
```

## Notes

- `$ping` takes no argument; any argument is refused ("Invalid argument count").
- Do not rely on `$ping` to measure latency: check the value on your own bot before using it in a condition.
- To check the bot's uptime, use `$uptime[]`.
