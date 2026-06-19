---
layout: doc
title: $httpPatch[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpPatch
syntax: $httpPatch[url;body?]
description: Performs an HTTP PATCH request to the specified URL, optionally sending a partial update body, and returns the response body as a string
parameters:
  - name: url
    type: string
    required: true
    description: The full URL to send the PATCH request to (including https://)
  - name: body
    type: string
    required: false
    description: The request body containing the partial update data, typically a JSON patch object. Omit for an empty PATCH.
returns:
  type: string
  description: The response body as a plain text string. Use $httpResult to parse JSON responses.
related:
  - httpGet
  - httpPost
  - httpPut
  - httpDelete
  - httpAddHeader
  - httpResult
  - httpStatus
examples:
  - title: Partial update of a resource
    code: |
      $httpAddHeader[Content-Type;application/json]
      $httpPatch[https://jsonplaceholder.typicode.com/posts/1;{"title":"Partially Updated"}]
      $description[New title: "$httpResult[title] (Status: $httpStatus)]"
  - title: Patch with JSON merge
    code: |
      $httpAddHeader[Content-Type;application/json]
      $httpPatch[https://api.example.com/users/42;{"bio":"Updated bio text"}]
      $if[$httpStatus==200]
        Update successful
      $else
        Error: $httpStatus
      $endif
---
$httpPatch sends a synchronous HTTP PATCH request, used to apply a partial update to a resource. Unlike PUT (which replaces the entire resource), PATCH only modifies the fields provided in the request body. Set the Content-Type header via $httpAddHeader before sending JSON payloads. After the request, use $httpResult to access the response and $httpStatus to check the outcome.
