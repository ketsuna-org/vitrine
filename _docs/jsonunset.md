---
layout: doc
title: $jsonUnset[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonUnset
syntax: $jsonUnset[(key)]
description: Removes a key (or array element) and its value from the current JSON document. With no argument, clears the whole document.
---
$jsonUnset removes a key-value pair from the JSON object. The path is given as separate arguments (one per level), not with dot notation: `$jsonUnset[user;token]`. A numeric segment removes an array element (the following elements shift down). With no argument, the whole document is reset to an empty object `{}`. If the specified key does not exist, no error is thrown — the operation is silently ignored. The function returns an empty string. This is useful for cleaning API responses, removing sensitive fields (like passwords) before logging, or pruning empty configuration options.

## Examples

### Delete Key from JSON Object

```bdfd
$jsonParse[{"token":"secret123","publicName":"Bot"}]
$jsonUnset[token]
$title[Sanitized JSON Object]
$description[Output after unset: `$jsonStringify`]
$color[#5865F2]
```
