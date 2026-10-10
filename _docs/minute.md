---
layout: doc
title: $minute
translation_key: docs
category: "Date & Time"
function_name: minute
syntax: $minute
description: Returns the current minute (0 to 59), in UTC or in the timezone set with $time.
---

# $minute

The function `$minute` returns the current minute (from 0 to 59).

## Syntax

```
$minute
```

> **Note:** This function takes no parameters (passing one is an error).

## Return Value

A number between 0 and 59 representing the current minute, with no leading zero (for example `5`, not `05`).

## Examples

### Simple Minute

```bdfd
Current minute: $minute
```

### Combined hours and minutes

```bdfd
The time is $hour:$minute
```

### Formatting with a leading zero

```bdfd
$if[$minute<10]
The time is $hour:0$minute
$else
The time is $hour:$minute
$endif
```

## Notes

- The value is read in UTC unless a timezone was set earlier with `$time[timezone]`.
- Combined with `$hour` and `$second`, this function allows you to create custom clocks.
