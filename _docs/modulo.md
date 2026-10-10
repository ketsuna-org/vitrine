---
layout: doc
title: $modulo[]
translation_key: docs
category: "Math & Text"
function_name: modulo
syntax: $modulo[a;b]
description: Calculates the remainder of the integer division of a by b (a % b). Dividing by 0 is an error.
---

# $modulo[]

The function `$modulo[]` returns the remainder of the division of `a` by `b` (modulo operation: `a % b`). Both arguments must be integers.

## Syntax

```
$modulo[a;b]
```

## Parameters

| Parameter | Type   | Required | Description        |
|-----------|--------|-------------|--------------------|
| `a`       | integer | Yes         | The dividend.      |
| `b`       | integer | Yes         | The divisor (not `0`).       |

## Behavior

- Returns the remainder of `a` divided by `b`.
- Both values must be integers (decimal, text or empty values raise "Expected an integer in argument N."). Integers of any size are accepted.
- If `b = 0`, the call fails with the error "Cannot take remainder by zero.".
- Exactly two arguments are required.
- The result has the same sign as the dividend `a`.

## Examples

### Modulo Remainder Calculation

```bdfd
$title[Math: Modulo Remainder]
$description[Remainder of `17 % 5`: **$modulo[17;5]**]
$addField[Even Check ($modulo[4;2]);$if[$modulo[4;2]==0;Even;Odd];yes]
$color[#5865F2]
```
## Notes

- The sign follows the dividend: `$modulo[-17;5]` → `-2`, `$modulo[17;-5]` → `2`.
