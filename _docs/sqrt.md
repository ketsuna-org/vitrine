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

- Returns the square root of the value as a decimal number (double precision).
- For perfect squares, the result is an integer: `$sqrt[16]` → `4`.
- For other values, the result is a decimal number: `$sqrt[2]` → `1.4142135...`.
- For `0`, it returns `0`.
- For negative numbers, the behavior is undefined (may return `NaN` or an error).

## Examples

**Perfect square:**
```
$sqrt[16]
→ 4

$sqrt[25]
→ 5

$sqrt[100]
→ 10
```

**Non-integer root:**
```
$sqrt[2]
→ 1.4142135623730951
```

**Root of zero:**
```
$sqrt[0]
→ 0
```

**Hypotenuse calculation (Pythagorean theorem):**
```
$sqrt[$calculate[$getVar[a]^2 + $getVar[b]^2]]
```

## Notes

- Do not use with negative numbers.
- For powers (squaring), use `$calculate[value^2]` or `$multi[value;value]`.
- For other roots (cube root, etc.), use `$calculate[value^(1/3)]`.
- The precision is that of a Java `double` (~15 significant digits).
