---
layout: doc
title: $multi[]
translation_key: docs
category: "Math & Text"
function_name: multi
syntax: $multi[a;b]
description: Multiplies two values (a * b).
---

# $multi[]

The function `$multi[]` multiplies two values: `a * b`.

> **Important Note:** This function is purely mathematical. For conditional branching, use `$if[]`, `$elseif[]`, and `$else[]`.

## Syntax

```
$multi[a;b]
```

## Parameters

| Parameter | Type   | Required | Description            |
|-----------|--------|-------------|------------------------|
| `a`       | number | Yes         | The first factor.    |
| `b`       | number | Yes         | The second factor.     |

## Behavior

- Returns the product `a * b`.
- Supports decimal numbers.
- If either argument is `0`, the result is `0`.

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

- Only supports two arguments. To multiply more values, nest them: `$multi[$multi[a;b];c]` or use `$calculate[a * b * c]`.
- The separator is the semicolon `;`.
