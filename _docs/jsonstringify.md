---
layout: doc
title: $jsonStringify[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonStringify
syntax: $jsonStringify[]
description: Returns the current JSON document as compact JSON text; empty if no JSON document exists yet.
---
$jsonStringify returns the JSON document of the current command as compact JSON text (no extra whitespace). Integral decimals are written without `.0`, like `JSON.stringify`: `{"a":1.0}` gives `{"a":1}`. It takes no argument. For indented output use `$jsonPretty`.

## Behavior

- Returns an empty string if no JSON document exists yet (nothing loaded with `$json` / `$jsonParse` and nothing set).
- After `$jsonClear` (or `$jsonUnset` with no argument) it returns an empty string again, not `{}`.

## Examples

### Convert JSON Context to String

```bdfd
$jsonParse[{"command":"ticket","active":true}]
$title[Serialized JSON]
$description[`$jsonStringify`]
$color[#00BCD4]
```
