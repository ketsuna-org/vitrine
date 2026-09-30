---
layout: doc
title: $sub[]
translation_key: docs
category: "Math & Text"
function_name: sub
syntax: $sub[a;b]
description: Subtracts the second value from the first (a - b).
---

# $sub[]

The function `$sub[]` performs a subtraction between two values: `a - b`.

## Syntax

```
$sub[a;b]
```

## Parameters

| Parameter | Type   | Required | Description                        |
|-----------|--------|-------------|------------------------------------|
| `a`       | number | Yes         | The starting value (minuend).     |
| `b`       | number | Yes         | The value to subtract (subtrahend). |

## Behavior

- Returns `a - b`.
- The result can be negative.
- Supports decimal numbers.
- If the values are not numerical, the behavior is undefined.

## Examples

### Subtraction Calculation

```bdfd
$title[Math: Subtraction]
$description[Result of `10 - 3`: **$sub[10;3]**]
$addField[Negative Difference;$sub[5;10];yes]
$addField[Decimal Difference;$sub[10.5;3.2];yes]
$color[#5865F2]
$sendMessage[]
```
## Notes

- Only two arguments are accepted. To subtract several values, nest the calls: `$sub[$sub[a;b];c]` or use `$calculate[a - b - c]`.
- The separator is the semicolon `;`.
