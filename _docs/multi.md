---
layout: doc
title: $multi[]
translation_key: docs
category: "Math & Text"
function_name: multi
syntax: $multi[value1;value2;(value3;...)]
description: Multiplies two or more values.
---

# $multi[]

The function `$multi[]` multiplies all the values passed to it, in order. It needs at least 2 arguments and has no upper limit.

> **Important Note:** This function is purely mathematical. For conditional branching, use `$if[]`, `$elseif[]`, and `$else[]`.

## Syntax

```
$multi[value1;value2;(value3;...)]
```

## Parameters

| Parameter | Type   | Required | Description            |
|-----------|--------|-------------|------------------------|
| `value1;value2;...` | number | Yes | At least **2** numbers separated by `;` (no upper limit). |

## Behavior

- Returns the product of all values. `$multi[2;3;4]` → `24`.
- Integers are multiplied exactly (arbitrary size). If a decimal number is involved, the multiplication is done on decimals.
- A value that is not a finite number (text, empty) raises the error "Expected a finite number in argument N.".
- Fewer than 2 arguments is rejected ("Invalid argument count").
- Unless decimals are enabled with `$enableDecimals`, a non-integer result is rounded to the nearest integer (`$multi[1.5;1.5]` → `2`).
- If any argument is `0`, the result is `0`.

## Examples

### Multiplication Calculation

```bdfd
$title[Math: Multiplication]
$description[Result of `6 * 7`: **$multi[6;7]**]
$addField[Decimal Multiply;$multi[2.5;4];yes]
$addField[Negative Multiply;$multi[-3;5];yes]
$color[#5865F2]
```
## Notes

- Use `$enableDecimals[yes]` to keep decimal results.
- For more complex operations, use `$calculate[]`.
- The separator is the semicolon `;`.
