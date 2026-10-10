---
layout: doc
title: $jsonKeys[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonKeys
syntax: $jsonKeys[(key);(...);(separator)]
description: Returns the keys of the JSON object at a path of the current document, joined by a separator (default comma); empty if the value is not an object.
---
$jsonKeys returns the key names of a JSON object, joined by a separator. It does not depend on `$jsonForEach` (use `$jsonKey` for the current key of a loop). The document is not modified.

## Parameters

- With **no argument**, the keys of the whole document are returned, separated by `,`.
- With **one argument**, it is the path (not a separator) and the separator is `,`.
- With **two or more arguments**, the **last one is the separator** (used as written, it can be empty) and the preceding ones are the path.
- The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key.

## Return Value

- The key names of the object at the path (only that level, not nested keys), in document order, joined by the separator.
- An empty string if the value at the path is not an object (an array, a string, a missing path...).

## Examples

### List All Object Keys

```bdfd
$jsonParse[{"id":1,"name":"Bot","status":"online"}]
$title[JSON Object Keys]
$description[Keys list: `$jsonKeys`]
$color[#00BCD4]
```

### Custom separator on a nested object

```bdfd
$jsonParse[{"user":{"id":1,"name":"Bot"}}]
$sendMessage[$jsonKeys[user; | ]]
```
