---
layout: doc
title: $jsonUnset[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonUnset
syntax: $jsonUnset[(key)]
description: Removes a key (or array element) and its value from the current JSON document. With no argument, clears the whole document.
---
$jsonUnset removes a key, or an array element, from the JSON document. It returns an empty string.

## Parameters

The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. With no argument, the whole document is reset to an empty object `{}` (same as `$jsonClear`).

## Behavior

- Removing an array element shifts the following elements down.
- If the path does not exist, the call does nothing and raises no error.
- Dot notation is not supported: `$jsonUnset[user.id]` looks for a key literally named `user.id`.
- Useful to remove sensitive fields (such as a token) before logging or displaying the document.

## Examples

### Delete Key from JSON Object

```bdfd
$jsonParse[{"token":"secret123","publicName":"Bot"}]
$jsonUnset[token]
$title[Sanitized JSON Object]
$description[Output after unset: `$jsonStringify`]
$color[#5865F2]
```
