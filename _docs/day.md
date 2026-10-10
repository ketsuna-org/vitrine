---
layout: doc
title: $day[]
translation_key: docs
category: "Date & Time"
function_name: day
syntax: $day
description: Returns the current day of the month (1 to 31). Resolved at runtime.
---

# $day[]

The `$day` function returns the current day of the month (1 to 31).

## Syntax

```text
$day
```

> **Note:** This function does not take any parameters (`$day[x]` is refused).

## Return value

A number from 1 to 31 representing the current day of the month, **without a leading zero** (`5`, not `05`). The value is read when the function runs.

The day is computed from the clock of the machine running the bot, in **UTC** by default. After `$time[timezone]` (a TZ database name such as `Asia/Tokyo`), it is the day in that time zone for the rest of the script.

## Examples

### Simple day

```bdfd
Day: $day
```

### Conditional message

```bdfd
$if[$day==1]
This is the first of the month!
$else
Today is day $day of the month.
$endif
```

### Day in an embed

```bdfd
$title[Today]
$description[Today is day **$day** of the month]
```

## Notes

- The value depends on the system date of the server running the bot.
- Returns `1` for the first day of the month, and up to `31` for the last day.
- To get the full date, use `$date`; for the month name, `$month`.
