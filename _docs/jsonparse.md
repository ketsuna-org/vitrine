---
layout: doc
title: $jsonParse[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonParse
syntax: $jsonParse[json]
description: Parses a JSON string into the current JSON document, replacing it; invalid JSON or a scalar gives an empty object {}.
---
$jsonParse loads a JSON text — an API response, user input — into the JSON document of the current command and replaces whatever was stored. It returns an empty string.

## Parameters

| Parameter | Description |
|---|---|
| `json` | Required. The JSON text. Exactly one argument is accepted. |

## Behavior

- A JSON **object** or **array** becomes the document.
- Anything else — malformed JSON, an empty string, a number or a string literal — does **not** raise an error: the document becomes an empty object `{}`.
- Use `$jsonStringify` to get the document back as text.

## Examples

### Parse JSON into Embed

```bdfd
$jsonParse[{"title":"Welcome","description":"Enjoy your stay!","color":"#5865F2"}]
$title[$jsonValue[title]]
$description[$jsonValue[description]]
$color[$jsonValue[color]]
```
