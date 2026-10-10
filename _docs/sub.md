---
layout: doc
title: $sub[]
translation_key: docs
category: "Math & Text"
function_name: sub
syntax: $sub[value1;value2;(value3;...)]
description: Subtracts the following values from the first one (a - b - c ...).
---

# $sub[]

The function `$sub[]` subtracts every following value from the first one, from left to right. It needs at least 2 arguments and has no upper limit.

## Syntax

```
$sub[value1;value2;(value3;...)]
```

## Parameters

| Parameter | Type   | Required | Description                        |
|-----------|--------|-------------|------------------------------------|
| `value1` | number | Yes | The starting value (minuend). |
| `value2;(value3;...)` | number | Yes (at least `value2`) | The values to subtract, in order. |

## Behavior

- Returns `value1 - value2 - value3 ...`. `$sub[10;3;2]` → `5`.
- The result can be negative.
- Integers are subtracted exactly (arbitrary size). If a decimal number is involved, the subtraction is done on decimals.
- A value that is not a finite number (text, empty) raises the error "Expected a finite number in argument N.".
- Fewer than 2 arguments is rejected ("Invalid argument count").
- Unless decimals are enabled with `$enableDecimals`, a non-integer result is rounded to the nearest integer (`$sub[10.5;3.2]` → `7`).

## Examples

### Subtraction Calculation

```bdfd
$title[Math: Subtraction]
$description[Result of `10 - 3`: **$sub[10;3]**]
$addField[Negative Difference;$sub[5;10];yes]
$addField[Decimal Difference;$sub[10.5;3.2];yes]
$color[#5865F2]
```
## Notes

- Use `$enableDecimals[yes]` to keep decimal results (`$sub[10.5;3.2]` → `7.3`).
- For more complex operations, use `$calculate[]`.
- The separator is the semicolon `;`.
