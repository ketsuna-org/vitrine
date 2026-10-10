---
layout: doc
title: $wait[]
translation_key: docs
category: "Control Flow"
function_name: wait
syntax: $wait[duration]
description: Pauses the script for a duration (positive, at most 40 minutes) before continuing.
---

`$wait` pauses the script for a given duration, then continues with the next statement.

## Syntax

```text
$wait[duration]
```

## Parameters

| Parameter | Description |
|---|---|
| `duration` | Required. A positive duration of at most 40 minutes. Otherwise: `Duration must be positive and at most 40 minutes.` |

## Duration Format

| Format | Example | Meaning |
|--------|---------|---------|
| No unit | `3`, `0.5` | Seconds (decimals allowed) |
| Milliseconds | `500ms` | `ms`, `millisecond(s)` |
| Seconds | `10s` | `s`, `sec`, `second(s)` |
| Minutes | `2m` | `m`, `min`, `minute(s)` |
| Hours, days, weeks, years | `1h`, `1d`, `1w`, `1y` | Accepted by the parser, but anything above 40 minutes is refused by `$wait` |
| Combined | `1m30s` | Parts are added together |

`$wait[3]` is equivalent to `$wait[3s]`. The unit is case-insensitive and a space between the number and the unit is accepted. An empty, zero, negative or unparsable duration is refused.

## How It Works

1. The script is suspended for the duration; variables and state are preserved.
2. The function returns an empty string and execution continues.

## Important: the response is sent at the end

The text, embeds and components written in the script form **one response** that is sent when the script ends. Messages sent with `$sendMessage` are sent immediately. So `$wait` is mostly useful between `$sendMessage` calls.

## When Not to Use

- **Waiting for user input**: `$awaitFunc` does not suspend the script either (see its page).
- **Cooldown enforcement**: use `$cooldown`, which persists across invocations.

## Examples

### Delayed follow-up message

```bdfd
$sendMessage[Processing request, please wait 3 seconds...]
$wait[3s]
$sendMessage[Operation completed successfully!]
```

### Short pause

```bdfd
First
$wait[500ms]
Second
```

Both lines are part of the same response, which is sent after the pause.
