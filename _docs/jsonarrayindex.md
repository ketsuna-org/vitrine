---
layout: doc
title: $jsonArrayIndex[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayIndex
syntax: $jsonArrayIndex[key;(...);value]
description: Returns the position (zero-based) of a value in the JSON array at a path of the current document, or -1 if the value is not found.
---
$jsonArrayIndex **searches** an array: it returns the zero-based position of the first element equal to the given value, or `-1` if there is none (also when the path is missing or is not an array). To read the element at a position, use `$jsonValue[array;position]`.

## Parameters

The **last argument is the value to look for**; all the arguments before it form the path. The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. At most 100 arguments are accepted in total.

The value is converted like in `$jsonSet` before comparing (`2` matches the number `2` but not the string `"2"`; `true` matches the boolean). Objects and arrays never match (the result is `-1`).

## Examples

### Find the Position of an Item

```bdfd
$jsonParse[{"colors":["#5865F2","#57F287","#FEE75C"]}]
$title[Array Search]
$description[Position of #57F287: `$jsonArrayIndex[colors;#57F287]`
Position of #000000: `$jsonArrayIndex[colors;#000000]`]
$color[#5865F2]
```
