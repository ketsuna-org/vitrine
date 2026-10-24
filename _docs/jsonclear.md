---
layout: doc
title: $jsonClear[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonClear
syntax: $jsonClear[]
description: Empties the current JSON document, back to the state before any $jsonParse or $jsonSet, and returns an empty string.
---
$jsonClear empties the JSON document of the current command, as if no `$jsonParse` or `$jsonSet` had run; everything previously stored is discarded. It does not put `{}` back. It takes no argument and returns an empty string.

## Behavior

- After `$jsonClear`, `$jsonStringify` and `$jsonPretty` return an empty string, and `$jsonExists[...]` and `$jsonArrayIndex[...]` also return an empty string (not `false` / `-1`) until a new `$jsonParse` or `$jsonSet`. A later `$jsonSet[b;1]` starts a new document: `{"b":1}`.
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
