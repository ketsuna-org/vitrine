---
layout: doc
title: $httpPut[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpPut
syntax: $httpPut[url;body?]
description: Performs an HTTP PUT request to the specified URL, optionally sending a request body, and returns the response body as a string
---
$httpPut sends a synchronous HTTP PUT request, used to replace an entire resource at the given URL. Unlike POST (which creates), PUT is idempotent and should fully replace the target resource. Always set the appropriate Content-Type header via $httpAddHeader before sending. Use $httpResult to access structured JSON responses and $httpStatus to verify the request outcome.
