---
layout: doc
title: $sum[]
translation_key: docs
category: "Math & Text"
function_name: sum
syntax: $sum[value1;value2;(value3;...)]
description: Calculates the sum of all provided values.
---

# $sum[]

The function `$sum[]` adds up all numerical values passed to it. It is variadic: it needs at least 2 arguments and accepts an unlimited number of them.

## Syntax

```
$sum[value1;value2;(value3;...)]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `value1;value2;...` | number | Yes | At least **2** numbers separated by `;` (no upper limit). |

## Behavior

- Adds all values in the order they are provided.
- Integers are added exactly (arbitrary size). If a decimal number is involved, the addition is done on decimals.
- A value that is not a finite number (text, empty) raises the error "Expected a finite number in argument N.".
- Requires at least 2 arguments; `$sum[]` and `$sum[42]` are rejected ("Invalid argument count").
- Unless decimals are enabled with `$enableDecimals`, a non-integer result is rounded to the nearest integer.

## Return Value

The sum, as text.

## Examples

### Sum of Numbers

```bdfd
$title[Math: Sum Calculation]
$description[Sum of `5 + 10 + 15`: **$sum[5;10;15]**]
$addField[Negative Values;$sum[42;-2];yes]
$color[#5865F2]
$sendMessage[]
```
## Notes

- The result is always a string of characters representing a number.
- Use `$enableDecimals[yes]` to keep decimal results.
- For more complex operations, use `$calculate[]`.
- Semicolons `;` are required as separators.
