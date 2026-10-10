---
layout: doc
title: $hour[]
translation_key: docs
category: "Date & Time"
function_name: hour
syntax: $hour
description: Returns the current hour (0 to 23), in UTC or in the timezone set with $time.
---

# $hour[]

The `$hour` function returns the current hour in 24-hour format (from 0 to 23).

## Syntax

```
$hour
```

> **Note:** This function takes no parameters (passing one is an error).

## Return Value

A number between 0 and 23 representing the current hour, with no leading zero (for example `7`, not `07`).

| Value | Meaning |
|--------|---------------|
| 0 | Midnight |
| 12 | Noon |
| 23 | 11 PM |

## Examples

### Simple time

```bdfd
It is $hour o'clock.
```

### Message according to the time of day

```bdfd
$if[$hour>=6&&$hour<12]
☀️ Good morning!
$elseif[$hour>=12&&$hour<18]
🌤️ Good afternoon!
$elseif[$hour>=18&&$hour<22]
🌅 Good evening!
$else
🌙 Good night!
$endif
```

## Notes

- 24-hour format: `0` = midnight, `12` = noon, `23` = 11 PM.
- The value is read in UTC unless a timezone was set earlier with `$time[timezone]`.
