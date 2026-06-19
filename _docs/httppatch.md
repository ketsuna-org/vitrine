---
layout: doc
title: $httpPatch[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpPatch
syntax: $httpPatch[url;body?]
description: Performs an HTTP PATCH request to the specified URL, optionally sending a partial update body, and returns the response body as a string
---
$httpPatch sends a synchronous HTTP PATCH request, used to apply a partial update to a resource. Unlike PUT (which replaces the entire resource), PATCH only modifies the fields provided in the request body. Set the Content-Type header via $httpAddHeader before sending JSON payloads. After the request, use $httpResult to access the response and $httpStatus to check the outcome.
