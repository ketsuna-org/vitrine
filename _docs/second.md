---
layout: doc
title: $second[]
translation_key: docs
category: "Date & Time"
function_name: second
syntax: $second
description: Returns the current second (0 to 59). Resolved at runtime.
---

# $second[]

The function `$second[]` returns the current second (from 0 to 59).

> **Important:** This function uses the special identifier `((second))` which is resolved at **runtime**.

## Syntax

```
$second
```

> **Note:** This function does not take any parameters.

## Return Value

A number between 0 and 59 representing the current second.

## Examples

### Simple second

```bdfd
Current second: $second
```

### Custom full time

```bdfd
It is precisely $hour:$minute and $second seconds.
```

### Clock in an embed

```bdfd
$title[🕐 Clock]
$description[$hour:$minute:$second]
$footer[Updated at each execution]
```

## Notes

- Use `$time[]` to get the formatted time `HH:MM:SS` directly.
