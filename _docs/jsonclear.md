---
layout: doc
title: $jsonClear[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonClear
syntax: $jsonClear[]
description: Resets the current JSON document to an empty object {} and returns an empty string.
---
$jsonClear resets the JSON document of the current command to an empty object `{}`; everything previously stored is discarded. It takes no argument and returns an empty string.

## Behavior

- After `$jsonClear`, `$jsonStringify` returns `{}` and `$jsonExists` (no argument) returns `true`.
- `$jsonClear` is not the same as `$json` with no argument, which only reads the document. `$jsonUnset` with no argument has the same effect as `$jsonClear`.

## Examples

### Reset JSON Context

```bdfd
$jsonParse[{"temp":"data"}]
$jsonClear
$title[Clear JSON Context]
$description[JSON document after clearing: `$jsonStringify`]
$color[#5865F2]
```
