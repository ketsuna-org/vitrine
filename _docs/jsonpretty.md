---
layout: doc
title: $jsonPretty[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonPretty
syntax: $jsonPretty[indent?]
description: Prettifies the current internal JSON structure into a human-readable, indented JSON string for display or debugging.
---
$jsonPretty is useful for debugging JSON data or displaying it to users in a readable format. Unlike $jsonStringify which produces compact output, $jsonPretty adds line breaks and indentation. Use inside code blocks (```json) for embed descriptions. If no JSON context exists, returns an empty string.
