---
layout: doc
title: $divide[]
translation_key: docs
category: "Math & Text"
function_name: divide
syntax: $divide[a;b]
description: Divides the first value by the second (a / b). If the divisor is 0, it returns 0 instead of generating an error.
---

# $divide[]

The `$divide[]` function performs a division: `a / b`. It is protected against division by zero: instead of generating an error, it simply returns `0`.

## Syntax

```
$divide[a;b]
```

## Parameters

| Parameter | Type   | Required | Description                      |
|-----------|--------|-------------|----------------------------------|
| `a`       | number | Yes         | The dividend (numerator).       |
| `b`       | number | Yes         | The divisor (denominator).      |

## Behavior

- Returns the quotient `a / b`.
- The result can be a decimal number.
- **If `b = 0`, it returns `0`** without generating an error. This is a built-in protection.

## Examples

**Simple division:**
```
$divide[10;2]
→ 5
```

**Decimal result:**
```
$divide[10;3]
→ 3.333333...
```

**Division by zero (protected):**
```
$divide[42;0]
→ 0
```

**Average calculation:**
```
$divide[$sum[12;15;18];3]
→ 15
```

## Notes

- Protection against division by zero prevents accidental crashes, but note: `0` can be a legitimate result or an error indicator depending on the context.
- For finer control, use `$calculate[a / b]` (which may behave differently).
