---
layout: doc
title: $jsonArraySort[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArraySort
syntax: $jsonArraySort[key;(...);(order)]
description: Sorts, in place, the JSON array at a path of the current document, ascending by default or descending when the last argument is desc.
---
$jsonArraySort sorts the elements of a JSON array in place. It returns an empty string.

## Parameters

At least one argument is required.

- With **one argument**, it is the path and the order is ascending.
- With **two or more arguments**, the **last one is always the order** and the preceding ones are the path. The order is `desc` (case-insensitive) for descending; any other text, such as `asc` or `foo`, means ascending.
- The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key.

Because the last argument is read as the order, sorting a nested array always needs an explicit order: `$jsonArraySort[a;r;asc]` sorts `a` > `r`, whereas `$jsonArraySort[a;r]` sorts `a` with the order `r` (and replaces `a` by an empty array if it is not an array).

## Behavior

- Elements that are numbers, or strings that read as numbers, are compared numerically; they come before the other elements in ascending order (after them in descending order).
- The other elements are compared as text, code unit by code unit, so upper-case letters sort before lower-case ones (`B`, `C`, `a`, `b`).
- If the value at the path is missing or is not an array, it is replaced by an empty array.

## Examples

### Sort Elements in JSON Array

```bdfd
$jsonParse[{"scores":[50,10,95,30]}]
$jsonArraySort[scores]
$title[Sorted Scores]
$description[Sorted ascending: `$jsonStringify`]
$color[#5865F2]
```

### Descending order

```bdfd
$jsonParse[{"scores":[50,10,95,30]}]
$jsonArraySort[scores;desc]
$sendMessage[$jsonStringify]
```
