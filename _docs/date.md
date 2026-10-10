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

The `$date` function returns the current date as `YYYY-MM-DD`.

## Syntax

```text
$date
```

> **Note:** This function does not take any parameters (`$date[1]` is refused).

## Return value

The current date in the format `YYYY-MM-DD` with a four-digit year and a zero-padded month and day (for example `2026-10-10`). The value is read when the function runs.

The date is computed from the clock of the machine running the bot, in **UTC** by default. After `$time[timezone]` (a TZ database name such as `Europe/Paris`), `$date` returns the date in that time zone for the rest of the script.

## Difference from specific functions

`$date` returns the full date. To get specific components of the date, use:

| Function | Returns |
|----------|----------|
| `$day` | The day of the month, without a leading zero (1-31) |
| `$month` | The English name of the month (for example `October`) |
| `$year` | The year (e.g., 2026) |

## Examples

### Simple date

```bdfd
The current date is $date
```

### Date in a given time zone

```bdfd
$time[Asia/Tokyo]
In Tokyo it is the $date
```

### Date in an embed

```bdfd
$title[Information]
$description[Current date: $date]
$footer[Server time]
```

## Notes

- The date is based on the system clock of the server running the bot.
