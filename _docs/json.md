---
layout: doc
title: $json[]
translation_key: docs
category: "HTTP & JSON"
function_name: json
syntax: $json[value?]
description: Creates a JSON object with an optional initial value. If no value is provided, an empty JSON object is created.
---
The $json function is the entry point for all JSON operations. It initialises an internal JSON context that all subsequent JSON functions operate on. If called without a value, an empty object `{}` is created. If a value is provided, it must be valid JSON. The internal JSON structure persists until it is cleared with $jsonClear or overwritten by calling $json again.
