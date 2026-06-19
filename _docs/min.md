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

**Simple minimum:**
```
$min[10;3]
→ 3
```

**Multiple values:**
```
$min[5;12;3;8;1]
→ 1
```

**With negative numbers:**
```
$min[-5;10;-2;0]
→ -5
```

**With decimal numbers:**
```
$min[2.5;1.1;3.9]
→ 1.1
```

## Notes

- To find the largest value, use `$max[]`.
- For more complex comparisons, use `$calculate[min(a, b)]`.
- The separator is the semicolon `;`.
