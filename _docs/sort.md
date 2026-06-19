---
layout: doc
title: $sort[]
translation_key: docs
category: "Math & Text"
function_name: sort
syntax: $sort[separator;(direction)]
description: Sorts elements (separated by the given delimiter) and returns them as a single string.
parameters:
  - name: separator
    type: string
    required: true
    description: The delimiter used in both the input and output. Elements must be joined by this separator (e.g., "," or " ").
  - name: direction
    type: string
    required: false
    description: Sort order. "asc" or "ascending" for ascending, "desc" or "descending" for descending. Default is descending (numerical).
returns:
  type: string
  description: The sorted elements joined by the same separator.
related:
  - textSplit
  - joinSplitText
  - numberSeparator
examples:
  - title: Sort numbers descending (default)
    code: |
      $sort[5,2,8,1,3;,]
      Result: "8,5,3,2,1"
  - title: Sort numbers ascending
    code: |
      $sort[5,2,8,1,3;,;asc]
      Result: "1,2,3,5,8"
  - title: Sort space-separated values
    code: |
      $sort[10 50 20 30 40; ;asc]
      Result: "10 20 30 40 50"
  - title: Sort with explicit descending
    code: |
      $sort[100,200,50,150;,;desc]
      Result: "200,150,100,50"
---
# $sort — Sort Elements

`$sort` takes a delimited list of values, sorts them, and returns them as a string using the same delimiter. It is primarily designed for numeric sorting but can be used with any comparable values.

## Syntax

```
$sort[separator;(direction)]
```

Wait — note the unusual syntax: `$sort` takes the **separator** as its first argument, not the data! The data is the **current split text** or must be set up beforehand.

> **Common usage pattern**: Use `$textSplit` first to load the data, then `$sort` to sort it.

```
$textSplit[5;2;8;1;3;]
$sort[;;(direction)]
```

Alternatively, `$sort` can operate on a delimited string directly:

```
$sort[5,2,8,1,3;,;(asc)]
```

## Parameters

- **separator** *(string, required)* — The delimiter separating the values.
- **direction** *(string, optional)* — `"asc"` or `"ascending"` for ascending; `"desc"` or `"descending"` for descending. Default: **descending (numerical)**.

## Return Value

- **Type**: `string`
- Returns the sorted elements joined by the same separator.

## Usage

```
$sort[3,1,4,1,5;,;asc]   → "1,1,3,4,5"
$sort[z,y,x;,]            → depends on implementation (default descending)
$sort[100 10 1000; ;asc]  → "10 100 1000" (numerical sort)
```

## Common Patterns

### Sorting User-Provided Numbers

```
$textSplit[$message; ]
$sendMessage[Sorted: $sort[ ;asc]]
```

### Ranking Scores

```
$textSplit[$getUserVar[scores];,]
$var[topScores;$sort[,;desc]]
```

### Organizing Data for Display

```
$textSplit[$getUserVar[items];,]
$sendMessage[Items (A-Z): $sort[,;asc]]
```

## Important Notes

- **Default is descending**: Unlike many sorting functions, BDFD's `$sort` defaults to descending order.
- **Numerical sort**: Numbers are sorted numerically (`2` before `10`), which is the expected behavior. For alphabetical sorting, behavior may differ.
- **Separator consistency**: The same separator is used for both input parsing and output joining.
- **Works with split context**: Can operate on the current `$textSplit` result, using the separator to join the output.
