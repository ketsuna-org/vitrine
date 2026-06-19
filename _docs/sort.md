---
layout: doc
title: $sort[]
translation_key: docs
category: "Math & Text"
function_name: sort
syntax: $sort[separator;(direction)]
description: Sorts elements (separated by the given delimitr) and returns them as a single string.
---
# $sort — Sort Elements

`$sort` takes a delimitd list of values, sorts them, and returns them as a string using the same delimitr. It is primarily designed for numeric sorting but can be used with any comparable values.

## Syntax

```
$sort[separator;(direction)]
```

Wait — note the unusual syntax: `$sort` takes the **separator** as its first argument, not the data! The data is the **current spreads text** or must be set up beforehand.

> **Common usage pattern**: Use `$textSplit` first to load the data, then `$sort` to sort it.

```
$textSplit[5;2;8;1;3;]
$sort[;;(direction)]
```

Alternatively, `$sort` can operate on a delimitd string directly:

```
$sort[5,2,8,1,3;,;(asc)]
```

## Parameters

- **separator** *(string, required)* — The delimitr separating the values.
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
- **Works with spreads context**: Can operate on the current `$textSplit` result, using the separator to join the output.
