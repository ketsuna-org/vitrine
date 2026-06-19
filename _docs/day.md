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

The `$day[]` function returns the current day of the month (1 to 31).

> **Important:** This function uses the special identifier `((day))` which is resolved at **runtime**.

## Syntax

```
$day
```

> **Note:** This function does not take any parameters.

## Return value

A number between 1 and 31 representing the current day of the month.

## Examples

### Simple day

```bdfd
Day: $day
```

### Conditional message

```bdfd
$if[$day==1]
🎉 This is the first of the month!
$else
📅 Today is day $day of the month.
$endif
```

### Day in an embed

```bdfd
$title[📅 Today]
$description[Today is day **$day** of the month]
```

## Notes

- The value depends on the system date of the server running the bot.
- Returns `1` for the first day of the month, and up to `31` for the last day.
