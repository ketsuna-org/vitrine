---
layout: doc
title: $max[]
translation_key: docs
category: "Math & Text"
function_name: max
syntax: $max[value1;value2;(value3;...)]
description: Returns the largest value among the provided arguments.
---

# $max[]

The function `$max[]` compares all provided values and returns the largest among them. It is variadic: it accepts an unlimited number of arguments.

## Syntax

```
$max[value1;value2;(value3;...)]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `value1;value2;...` | integer | Yes | At least **2** integers separated by `;` (no upper limit). A non-integer value (decimal, text, empty) raises an error. |

## Behavior

- Compares all values as integers and returns the largest.
- Supports negative integers (and arbitrarily large ones). Decimal numbers are **not** accepted: `5.5` raises "Expected an integer in argument N.".
- Requires at least 2 arguments; with a single argument or none, the call is rejected ("Invalid argument count").

## Return Value

The largest integer, as text.

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
- The separator is the semicolon `;`.

