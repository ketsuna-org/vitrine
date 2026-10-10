---
layout: doc
title: $min[]
translation_key: docs
category: "Math & Text"
function_name: min
syntax: $min[value1;value2;(value3;...)]
description: Returns the smallest value among the provided arguments.
---

# $min[]

The function `$min[]` compares all provided values and returns the smallest of them. It is variadic, meaning it accepts an unlimited number of arguments.

## Syntax

```
$min[value1;value2;(value3;...)]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `value1;value2;...` | integer | Yes | At least **2** integers separated by `;` (no upper limit). A non-integer value (decimal, text, empty) raises an error. |

## Behavior

- Compares all values as integers and returns the smallest.
- Supports negative integers (and arbitrarily large ones). Decimal numbers are **not** accepted: `5.5` raises "Expected an integer in argument N.".
- Requires at least 2 arguments; with a single argument or none, the call is rejected ("Invalid argument count").

## Return Value

The smallest integer, as text.

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
- The separator is the semicolon `;`.
