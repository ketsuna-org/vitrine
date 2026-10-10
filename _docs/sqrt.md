---
layout: doc
title: $sqrt[]
translation_key: docs
category: "Math & Text"
function_name: sqrt
syntax: $sqrt[value]
description: Calculates the square root of a number.
---

# $sqrt[]

The function `$sqrt[]` calculates the square root of a non-negative number.

## Syntax

```
$sqrt[value]
```

## Parameters

| Parameter | Type   | Required | Description                                    |
|-----------|--------|-------------|------------------------------------------------|
| `value`  | number | Yes         | The number to calculate the square root of. ≥ 0.  |

## Behavior

- Exactly one argument is required. A value that is not a finite number (text, empty) raises the error "Expected a finite number in argument 1.".
- For perfect squares, the result is an integer: `$sqrt[16]` → `4`.
- Unless decimals are enabled with `$enableDecimals[yes]`, the result is rounded to the nearest integer: `$sqrt[2]` → `1`, `$sqrt[2.25]` → `2`.
- With `$enableDecimals[yes]`, the decimal result is kept: `$sqrt[2]` → `1.4142135623730951`, `$sqrt[2.25]` → `1.5`.
- For `0`, it returns `0`.
- For a negative number, the call fails with the error "Square root requires a non-negative number.".

## Examples

### Square Root Calculation

```bdfd
$title[Math: Square Root]
$description[Square root of `16`: **$sqrt[16]**]
$addField[Square root of 25;$sqrt[25];yes]
$enableDecimals[yes]
$addField[Non-integer root ($sqrt[2]);$sqrt[2];yes]
$color[#5865F2]
```
## Notes

- Negative numbers are an error.
- `$enableDecimals` should be set before the `$sqrt[]` calls it must affect.
- For powers (squaring), use `$calculate[value^2]` or `$multi[value;value]`.
- For other roots (cube root, etc.), `$calculate[value^(1/3)]` can be used (for example `$calculate[8^(1/3)]` → `2`).
- With decimals enabled the value is a double-precision number.
