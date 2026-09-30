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

### Modulo Remainder Calculation

```bdfd
$title[Math: Modulo Remainder]
$description[Remainder of `17 % 5`: **$modulo[17;5]**]
$addField[Even Check ($modulo[4;2]);$if[$modulo[4;2]==0;Even;Odd];yes]
$color[#5865F2]
$sendMessage[]
```
## Notes

- For negative numbers, the behavior follows standard mathematical definitions: `$modulo[-17;5]` → `-2`.
