---
layout: doc
title: $jsonArrayPop[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayPop
syntax: $jsonArrayPop[(key);(...)]
description: Removes and returns the last item of the JSON array at a path of the current document; a missing or non-array value is replaced by an empty array.
---
$jsonArrayPop removes the last element from a JSON array and returns it — the equivalent of JavaScript's `Array.pop()` (LIFO processing). Strings, numbers and booleans are returned as text, objects and arrays as compact JSON.

## Parameters

The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. With no argument, the whole document is targeted.

## Behavior

- Popping from an empty array returns an empty string.
- If the value at the path is missing or is not an array, it is replaced by an empty array and an empty string is returned.

## Examples

### Remove Last Item with Pop

```bdfd
$jsonParse[{"queue":["Song 1","Song 2","Song 3"]}]
$var[removed;$jsonArrayPop[queue]]
$title[Array Pop]
$description[Popped item: **$var[removed]**
Remaining queue: `$jsonStringify`]
$color[#DA373C]
```
