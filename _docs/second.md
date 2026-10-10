---
layout: doc
title: $second[]
translation_key: docs
category: "Date & Time"
function_name: second
syntax: $second
description: Returns the current second (0 to 59), in UTC or in the timezone set with $time.
---

# $second[]

The function `$second[]` returns the current second (from 0 to 59).

## Syntax

```
$second
```

> **Note:** This function does not take any parameters (passing one is an error).

## Return Value

A number between 0 and 59 representing the current second, with no leading zero (for example `5`, not `05`).

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

- The value is read in UTC unless a timezone was set earlier with `$time[timezone]`.
