---
layout: doc
title: $time[]
translation_key: docs
category: "Date & Time"
function_name: time
syntax: $time
description: Returns the current time in HH:MM:SS format. Resolved at runtime.
---

# $time[]

The function `$time[]` returns the current time in `HH:MM:SS` (hours:minutes:seconds) format.

> **Important:** This function uses the special identifier `((time))` which is resolved at **runtime**, meaning at each execution of the command.

## Syntax

```
$time
```

> **Note:** This function takes no parameters.

## Return Value

A string in the format `HH:MM:SS` (e.g., `14:30:05`).

## Examples

### Simple Time

```bdfd
It is $time.
```

### Embed with Time

```bdfd
$title[🕐 Server Clock]
$description[Current time: **$time**]
$footer[24h Format]
```

### Complete Timestamp

```bdfd
📅 $date at $time
```

## Notes

- `$time[]` is the equivalent of `$hour:$minute:$second` combined into a single function.
- The time is based on the timezone of the server running the bot.
- For a Unix timestamp, use `$getTimestamp[]`.

