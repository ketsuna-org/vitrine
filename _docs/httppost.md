---
layout: doc
title: $httpPost[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpPost
syntax: $httpPost[url;body?]
description: Performs an HTTP POST request to the specified URL, optionally sending a request body, and returns the response body as a string
---
$httpPost sends a synchronous HTTP POST request to the provided URL. This is typically used to create resources, submit form data, or send data to an API endpoint. Always set the Content-Type header via $httpAddHeader when sending JSON bodies. The response body is stored internally and can be accessed with $httpResult; use $httpStatus to check the response status code.
