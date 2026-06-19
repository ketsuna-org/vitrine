---
layout: doc
title: $modulo[]
translation_key: docs
category: "Math & Text"
function_name: modulo
syntax: $modulo[a;b]
description: Calculates the remainder of the division of a by b (a % b). If b = 0, returns 0.
---

# $modulo[]

The function `$modulo[]` returns the remainder of the division of `a` by `b` (modulo operation: `a % b`). Like `$divide[]`, it is protected against division by zero.

## Syntax

```
$modulo[a;b]
```

## Parameters

| Parameter | Type   | Required | Description        |
|-----------|--------|-------------|--------------------|
| `a`       | number | Yes         | The dividend.      |
| `b`       | number | Yes         | The divisor.       |

## Behavior

- Returns the remainder of `a` divided by `b`.
- If `b = 0`, returns `0` (built-in protection).
- The result always has the same sign as the dividend `a`.

## Examples

**Simple modulo:**
```
$modulo[17;5]
→ 2
```

**Even/odd detection:**
```
$modulo[$getVar[number];2]
→ 0 if even, 1 if odd
```

**With exact multiples:**
```
$modulo[20;5]
→ 0
```

**Modulo by zero (protected):**
```
$modulo[42;0]
→ 0
```

## Common Use Cases

- Checking if a number is divisible by another.
- Alternating behaviors (even/odd).
- Cycling through a list (index % size).
- Calculating cycles (every N iterations).

## Notes

- For negative numbers, the behavior follows standard mathematical definitions: `$modulo[-17;5]` → `-2`.
