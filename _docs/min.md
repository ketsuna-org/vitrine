---
layout: doc
title: $min[]
translation_key: docs
category: "Math & Text"
function_name: min
syntax: $min[value1;value2;...]
description: Returns the smallest value among the provided arguments.
---

# $min[]

The function `$min[]` compares all provided values and returns the smallest of them. It is variadic, meaning it accepts an unlimited number of arguments.

## Syntax

```
$min[value1;value2;...]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `values`  | number | Yes         | List of numerical values separated by `;`. Variadic. |

## Behavior

- Iterates through all values and returns the smallest one.
- Supports negative and decimal numbers.
- With a single argument, returns that argument.
- With zero arguments, the behavior is undefined (returns empty or 0).

## Examples

### Lowest Value Comparison

```bdfd
$title[Math: Minimum Value]
$description[The lowest number among `5, 12, 3, 8, 1` is: **$min[5;12;3;8;1]**]
$addField[Comparison with Negatives;$min[-5;10;-2;0];yes]
$color[#5865F2]
$sendMessage[]
```
## Notes

- To find the largest value, use `$max[]`.
- For more complex comparisons, use `$calculate[min(a, b)]`.
- The separator is the semicolon `;`.
