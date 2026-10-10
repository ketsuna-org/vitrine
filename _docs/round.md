---
layout: doc
title: $round[]
translation_key: docs
category: "Math & Text"
function_name: round
syntax: $round[value;(decimals)]
description: Rounds a number to the nearest integer, or to a given number of decimal places. Values ending exactly in .5 are rounded toward positive infinity.
---

# $round[]

The function `$round[]` rounds a number to the nearest integer, or to the number of decimal places given as second argument.

## Syntax

```
$round[value;(decimals)]
```

## Parameters

| Parameter | Type    | Required | Description                      |
|-----------|---------|----------|----------------------------------|
| `value`   | number  | Yes      | The number to round. Must be a finite number (otherwise: "Round requires a finite number."). |
| `decimals` | integer | No      | Number of decimal places to keep. Empty or omitted: `0`. A negative integer rounds to tens, hundreds... (`$round[1234.5678;-2]` → `1200`). A non-integer raises "Decimal places must be an integer.". |

## Behavior

- The number is rounded as written (as decimal text), not through a floating-point approximation: `$round[2.675;2]` → `2.68`.
- A value strictly below the midpoint (`.5`) is rounded down, above it rounded up.
- A value exactly on the midpoint is rounded toward positive infinity: `$round[3.5]` → `4`, `$round[-3.5]` → `-3`, `$round[-2.5]` → `-2`.
- For an integer: returns the integer itself.
- Trailing zeros are removed: `$round[3.10;5]` → `3.1`.
- The result does not depend on `$enableDecimals`.
- More than two arguments are rejected ("Invalid argument count").

## Examples

### Rounding to Nearest Integer

```bdfd
$title[Math: Round Function]
$description[Rounding `3.5`: **$round[3.5]**
Rounding `3.4`: **$round[3.4]**]
$addField[Negative Value;$round[-3.6];yes]
$addField[Two Decimals;$round[3.14159;2];yes]
$color[#5865F2]
```
## Comparison: floor / ceil / round

| Value | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`     |

## Notes

- With one argument the result is an integer (in the form of a string).
- Use `$floor[]` to always round down, and `$ceil[]` to always round up.
