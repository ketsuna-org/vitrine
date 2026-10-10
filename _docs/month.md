---
layout: doc
title: $month
translation_key: docs
category: "Date & Time"
function_name: month
syntax: $month
description: Returns the English name of the current month (January to December), in UTC or in the timezone set with $time.
---

# $month

The function `$month` returns the **English name** of the current month (for example `October`). It does not return a number.

## Syntax

```
$month
```

> **Note:** This function takes no parameters (passing one is an error).

## Return Value

One of `January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`.

## Examples

### Simple Month

```bdfd
Current month: $month
```

### Conditional message

```bdfd
$if[$month==December]
❄️ It is December!
$else
It is not December.
$endif
```

## Notes

- The value is read in UTC unless a timezone was set earlier with `$time[timezone]`.
- The name is always in English; use `$date` for a numeric `YYYY-MM-DD` date.
