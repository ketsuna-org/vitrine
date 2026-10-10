---
layout: doc
title: $sort[]
translation_key: docs
category: "Math & Text"
function_name: sort
syntax: $sort[number1;(number2;...);direction;amount;separator]
description: Sorts the given numbers in ascending or descending order and returns them joined by a separator.
---
# $sort — Sort Numbers

`$sort` takes a list of numbers as separate arguments, sorts them numerically, and returns them joined with the chosen separator.

## Syntax

```
$sort[number1;(number2;...);direction;amount;separator]
```

The function requires at least 4 arguments: one number, then `direction`, `amount` and `separator`. The **last three** arguments are always `direction`, `amount` and `separator`; every argument before them is a number to sort.

## Parameters

- **number1;(number2;...)** *(required, at least one)* — The numbers to sort. Each one must be a finite number, otherwise the error "Sort requires finite numbers." is raised.
- **direction** *(required)* — `asc` for ascending or `desc` for descending. Any other value raises the error "Sort direction must be asc or desc.".
- **amount** *(required)* — How many values to return: `-1` for all of them, or a non-negative integer (a value larger than the number of values returns all of them).
- **separator** *(required)* — The text placed between the returned values. It cannot be empty.

## Return Value

- **Type**: `string`
- The sorted numbers (written as they were given), joined by `separator`. Values that are equal keep their original order.

## Usage

```
$sort[3;1;4;1;5;asc;-1;,]   → "1,1,3,4,5"
$sort[100;10;1000;desc;2;,] → "1000,100"
$sort[10;2;3;asc;-1;,]      → "2,3,10"
```

## Common Patterns

### Sorting numbers

```bdfd
$sendMessage[Sorted: $sort[5;2;9;1;7;asc;-1; ]]
```

### Top three scores

```bdfd
$sendMessage[Top 3: $sort[$getUserVar[score1];$getUserVar[score2];$getUserVar[score3];$getUserVar[score4];desc;3;, ]]
```

## Important Notes

- **Numerical sort**: Values are compared as numbers (`2` before `10`). Text values are refused.
- **Direction is case-sensitive**: only `asc` and `desc` are accepted.
- **Fixed positions**: the direction, amount and separator are always the last three arguments, so the number of values is variable but the separator comes last.

## Examples

### Ascending order

```bdfd
$title[Sorted Numbers]
$description[Numbers in ascending order: **$sort[5;2;9;1;7;asc;-1;, ]**]
$color[#57F287]
```
