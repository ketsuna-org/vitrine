---
layout: doc
title: $jsonUnset[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonUnset
syntax: $jsonUnset[key]
description: Removes a key and its associated value from the current JSON object.
---
$jsonUnset removes a key-value pair from the JSON object. It works with dot notation for nested keys. If the specified key does not exist, no error is thrown — the operation is silently ignored. This is useful for cleaning API responses, removing sensitive fields (like passwords) before logging, or pruning empty configuration options.
