---
layout: doc
title: $jsonSetString[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonSetString
syntax: $jsonSetString[key;(...);value]
description: Sets the value at a path of the current JSON document as a string, without converting numbers, booleans or JSON text.
---
$jsonSetString writes a value into the JSON document and always stores it as a JSON **string**, exactly as written (spaces included). It returns an empty string.

## Parameters

The **last argument is the value**; all the arguments before it form the path. The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. Missing levels are created, as in `$jsonSet`.

## Behavior

- `1` is stored as `"1"`, `true` as `"true"` and `{"x":1}` as the string `"{\"x\":1}"`. With `$jsonSet`, these would keep their type.
- Useful to keep leading zeros (`007`) or to send a field that an API expects as a string.

## Examples

### Set Explicit String Value

```bdfd
$jsonParse[{}]
$jsonSetString[status;operational]
$jsonSetString[code;007]
$title[Set String Field]
$description[Result: `$jsonStringify`]
$color[#5865F2]
```
