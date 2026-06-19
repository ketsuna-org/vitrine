---
layout: doc
title: $minute
translation_key: docs
category: "Date & Time"
function_name: minute
syntax: $minute
description: Returns the current minute (0 to 59). Resolved at runtime.
---

# $minute

The function `$minute` returns the current minute (from 0 to 59).

> **Important:** This function uses the special identifier `((minute))` which is resolved at **runtime**.

## Syntax

```
$minute
```

> **Note:** This function takes no parameters.

## Return Value

A number between 0 and 59 representing the current minute.

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

- Use `$time` to obtain the full time in the `HH:MM:SS` format.
- Combined with `$hour` and `$second`, this function allows you to create custom clocks.
