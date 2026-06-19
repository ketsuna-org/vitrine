---
layout: doc
title: $month
translation_key: docs
category: "Date & Time"
function_name: month
syntax: $month
description: Returns the current month as a number (1 to 12). Resolved at runtime.
---

# $month

The function `$month` returns the number of the current month (from 1 to 12).

> **Important:** This function uses the special identifier `((month))` which is resolved at **runtime**.

## Syntax

```
$month
```

> **Note:** This function takes no parameters.

## Return Value

A number between 1 and 12 representing the current month:

| Value | Month |
|--------|------|
| 1 | January |
| 2 | February |
| 3 | March |
| 4 | April |
| 5 | May |
| 6 | June |
| 7 | July |
| 8 | August |
| 9 | September |
| 10 | October |
| 11 | November |
| 12 | December |

## Examples

### Simple Month

```bdfd
Current month: $month
```

### Seasonal Message

```bdfd
$if[$month>=6&&$month<=8]
☀️ It is summer!
$elseif[$month==12||$month<=2]
❄️ It is winter!
$endif
```

## Notes

- The value depends on the system date of the server running the bot.
