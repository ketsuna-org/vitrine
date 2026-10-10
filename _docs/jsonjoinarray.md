---
layout: doc
title: $jsonJoinArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonJoinArray
syntax: $jsonJoinArray[key;(...);separator]
description: Joins the elements of the JSON array at a path of the current document into a string with the given separator; empty if the value is not an array.
---
$jsonJoinArray joins the elements of a JSON array into one string, with a separator between two elements — the equivalent of JavaScript's `Array.join()`. It is the inverse of `$jsonArray`. The document is not modified.

## Parameters

The **last argument is the separator**; all the arguments before it form the path. At least two arguments are required (`$jsonJoinArray[key]` is refused). The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. At most 100 arguments are accepted in total.

The separator is used as written (`, ` keeps its space) and can be empty. Backslash sequences such as `\n` are not converted: they stay as two characters.

## Return Value

- The elements joined by the separator. Strings, numbers and booleans appear as text, objects and arrays as compact JSON, `null` as an empty string.
- An empty string if the value at the path is missing or is not an array.

## Examples

### Join Array into Delimited String

```bdfd
$jsonParse[{"skills":["Dart","JavaScript","BDFD"]}]
$title[Developer Skills]
$description[Skills: **$jsonJoinArray[skills;, ]**]
$color[#9B30FF]
```
