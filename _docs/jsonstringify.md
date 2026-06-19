---
layout: doc
title: $jsonStringify[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonStringify
syntax: $jsonStringify[]
description: Converts the current internal JSON structure back into a compact JSON string with no extra whitespace.
---
$jsonStringify returns the internal JSON as a compact, minified string — ideal for sending in API requests, storing in variables, or logging. For human-readable output, use $jsonPretty instead. If no JSON has been initialised (via $json or $jsonParse), the function returns an empty string.
