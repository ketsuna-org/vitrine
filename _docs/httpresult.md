---
layout: doc
title: $httpResult[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpResult
syntax: $httpResult[key?]
description: Retrieves the full response body of the last HTTP request, or extracts a specific field from a JSON response using the given key
---
$httpResult provides access to the response from the most recent HTTP request. When called without arguments, it returns the raw response body as a string. When a key path is provided, it parses the response as JSON and navigates to the specified field using semicolons (;) as path separators. Numeric indices access array elements. Use $httpResult to extract meaningful data from API responses and display it with other BDFD functions.
