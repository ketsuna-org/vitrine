---
layout: doc
title: $year[]
translation_key: docs
category: "Date & Time"
function_name: year
syntax: $year
description: "Returns the current year (e.g., 2026), in UTC or in the timezone set with $time."
---

# $year[]

The `$year` function returns the current year.

## Syntax

```
$year
```

> **Note:** This function takes no parameters (passing one is an error).

## Return Value

The current year as a number (for example `2026`).

## Examples

### Simple year

```bdfd
We are in the year $year.
```

### Age calculation

```bdfd
Were you born in 2000? You are $sub[$year;2000] years old!
```

### Dynamic copyright

```bdfd
$footer[© $year - MyBot]
```

## Notes

- The year is read in UTC unless a timezone was set earlier with `$time[timezone]`.
- Useful for dynamic copyright footers.
