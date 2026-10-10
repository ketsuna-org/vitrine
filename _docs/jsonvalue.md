---
layout: doc
title: $jsonValue[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonValue
syntax: $jsonValue[(key);(...)]
description: Returns the value at a path of the current JSON document (one argument per level); inside $jsonForEach, returns the current element.
---
$jsonValue reads a value from the JSON document of the current command.

## Parameters

The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. At most 100 arguments are accepted in total. With no argument, the whole document is returned as compact JSON.

## Return Value

- Strings, numbers and booleans are returned as text (`Paris`, `22`, `false`); objects and arrays as compact JSON text.
- An empty string when the path does not exist, when the value is `null`, or when an array index is out of range. Use `$jsonExists` to tell a missing key from an empty value.
- Inside a `$jsonForEach` block, `$jsonValue` returns the current element and ignores its arguments.

## Examples

### Extract Value from Nested Path

```bdfd
$jsonParse[{"weather":{"city":"Paris","temp":"22°C"}}]
$title[Weather Forecast ⛅]
$description[City: **$jsonValue[weather;city]**
Temperature: **$jsonValue[weather;temp]**]
$color[#5865F2]
```
