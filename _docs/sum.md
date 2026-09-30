---
layout: doc
title: $sum[]
translation_key: docs
category: "Math & Text"
function_name: sum
syntax: $sum[value1;value2;...]
description: Calculates the sum of all provided values.
---

# $sum[]

The function `$sum[]` adds up all numerical values passed to it. It is variadic, meaning it accepts an unlimited number of arguments.

## Syntax

```
$sum[value1;value2;...]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `values` | number | Yes         | List of numerical values separated by `;`. Variadic. |

## Behavior

- Adds all values in the order they are provided.
- If no value is passed, it returns `0`.
- Non-numerical values are ignored or converted to `0` depending on the context.
- Supports decimal numbers.

## Examples

### Sum of Numbers

```bdfd
$title[Math: Sum Calculation]
$description[Sum of `5 + 10 + 15`: **$sum[5;10;15]**]
$addField[Single Value;$sum[42];yes]
$addField[Empty Sum;$sum[];yes]
$color[#5865F2]
$sendMessage[]
```
## Notes

- The result is always a string of characters representing a number.
- For more complex operations, use `$calculate[]`.
- Semicolons `;` are required as separators.
