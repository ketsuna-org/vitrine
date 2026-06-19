---
layout: doc
title: $date[]
translation_key: docs
category: "Date & Time"
function_name: date
syntax: $date
description: Returns the current date. This function is resolved at runtime.
---

# $date[]

The `$date[]` function returns the current date.

> **Important:** This function uses the special identifier `((date))` which is resolved at **runtime**, i.e., at each execution of the command. The value can vary from one execution to another.

## Syntax

```
$date
```

> **Note:** This function does not take any parameters.

## Return value

The current date, resolved at each execution.

## Difference from specific functions

`$date[]` returns the full date. To get specific components of the date, use:

| Function | Returns |
|----------|----------|
| `$day` | The day of the month (1-31) |
| `$month` | The month (1-12) |
| `$year` | The year (e.g., 2026) |

## Examples

### Simple date

```bdfd
The current date is $date
```

### Date in an embed

```bdfd
$title[📅 Information]
$description[Current date: $date]
$footer[Server time]
```

## Notes

- The date is based on the system clock of the server running the bot.
