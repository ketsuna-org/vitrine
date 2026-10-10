---
layout: doc
title: $jsonPretty[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonPretty
syntax: $jsonPretty[(indent)]
description: Returns the current JSON document as indented, multi-line JSON text; the indent defaults to 2 spaces.
---
$jsonPretty returns the JSON document with line breaks and indentation, unlike `$jsonStringify` which is compact. The document is not modified.

## Parameters

| Parameter | Description |
|---|---|
| `indent` | Optional. Number of spaces per level. Default: `2`. A non-numeric or negative value also gives `2`. `0` keeps the line breaks but removes the indentation. |

## Behavior

- Returns an empty string when no JSON document exists yet.

## Examples

### Format JSON Output

```bdfd
$jsonParse[{"status":"ok","code":200}]
$title[Pretty Printed JSON]
$description[$jsonPretty]
$color[#5865F2]
```
