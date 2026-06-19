---
layout: doc
title: $httpGet[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpGet
syntax: $httpGet[url]
description: Performs an HTTP GET request to the specified URL and returns the response body as a string
---
$httpGet sends a synchronous HTTP GET request to the provided URL. The function blocks the command execution until a response is received or the request times out. Custom headers can be added before the call using $httpAddHeader. After the request completes, the raw response body is stored internally and can be accessed via $httpResult. Use $httpStatus to check the HTTP status code of the response.

The URL must be a fully qualified URL including the scheme (https:// or http://). For best results with JSON APIs, use $httpResult with dot or bracket notation to extract specific fields from the parsed JSON response.
