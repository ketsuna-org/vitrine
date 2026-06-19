---
layout: doc
title: $year[]
translation_key: docs
category: "Date & Time"
function_name: year
syntax: $year
description: "Returns the current year (e.g., 2026). Resolved at runtime."
---

# $year[]

The `$year` function returns the current year.

> **Important:** This function uses the special identifier `((year))` which is resolved at **runtime**.

## Syntax

```
$year
```

> **Note:** This function takes no parameters.

## Return Value

The current year (for example `2026`), in the form of a string.

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

- The year is based on the system clock of the server running the bot.
- Useful for dynamic copyright footers.
