---
layout: doc
title: $max[]
translation_key: docs
category: "Math & Text"
function_name: max
syntax: $max[value1;value2;...]
description: Returns the largest value among the provided arguments.
---

# $max[]

The function `$max[]` compares all provided values and returns the largest among them. It is variadic: it accepts an unlimited number of arguments.

## Syntax

```
$max[value1;value2;...]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `values` | number | Yes         | List of numeric values separated by `;`. Variadic. |

## Behavior

- Scans all values and returns the largest.
- Supports negative and decimal numbers.
- With a single argument, returns that argument.
- With zero arguments, the behavior is undefined (returns empty or 0).

## Examples

**Simple maximum:**
```
$max[10;3]
→ 10
```

**Multiple values:**
```
$max[5;12;3;8;1]
→ 12
```

**With negative numbers:**
```
$max[-5;10;-2;0]
→ 10
```

**High score:**
```
$max[$getVar[scoreP1];$getVar[scoreP2];$getVar[scoreP3]]
```

## Notes

- To find the lowest value, use `$min[]`.
- For more complex comparisons, use `$calculate[max(a, b)]`.
- The separator is the semicolon `;`.

