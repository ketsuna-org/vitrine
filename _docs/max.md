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

### Highest Value Comparison

```bdfd
$title[Math: Maximum Value]
$description[The highest number among `5, 12, 3, 8, 1` is: **$max[5;12;3;8;1]**]
$addField[Comparison with Negatives;$max[-5;10;-2;0];yes]
$color[#5865F2]
$sendMessage[]
```
## Notes

- To find the lowest value, use `$min[]`.
- For more complex comparisons, use `$calculate[max(a, b)]`.
- The separator is the semicolon `;`.

