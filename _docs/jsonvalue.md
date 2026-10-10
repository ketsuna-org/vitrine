---
layout: doc
title: $jsonValue[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonValue
syntax: $jsonValue[(key)]
description: Retrieves the value at a path of the current JSON document. For nested access, give one argument per level. Inside $jsonForEach, returns the current value.
---
$jsonValue retrieves values from the JSON object. Give one argument per level to traverse nested objects and arrays (`$jsonValue[weather;city]`, `$jsonValue[tags;0]`); dot notation is not supported. Strings, numbers and booleans are returned as text, objects and arrays as JSON text. Inside a `$jsonForEach` block, `$jsonValue` returns the current element and ignores its arguments. If a key does not exist, an empty string is returned rather than throwing an error — use $jsonExists to check for key existence before retrieval if you need to distinguish between genuine empty strings and missing keys.

## Examples

### Extract Value from Nested Path

```bdfd
$jsonParse[{"weather":{"city":"Paris","temp":"22°C"}}]
$title[Weather Forecast ⛅]
$description[City: **$jsonValue[weather;city]**\nTemperature: **$jsonValue[weather;temp]**]
$color[#5865F2]
```
