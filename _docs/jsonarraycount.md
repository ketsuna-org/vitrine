---
layout: doc
title: $jsonArrayCount[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayCount
syntax: $jsonArrayCount[(key);(...)]
description: Returns the number of items in the JSON array at a path of the current document, or 0 if the value is missing or is not an array.
---
$jsonArrayCount returns the number of elements of the JSON array found at the given path, or `0` if the value is missing or is not an array. It never modifies the document.

## Parameters

The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. At most 100 arguments are accepted in total. With no argument, the whole document is targeted (so the result is `0` unless the document itself is an array).

## Examples

### Count Items in JSON Array

```bdfd
$jsonParse[{"items":["Sword","Shield","Potion"]}]
$title[Inventory Item Count]
$description[You have **$jsonArrayCount[items]** items in your bag.]
$color[#5865F2]
```

Use `$jsonForEach` to iterate over all the elements.
