---
layout: doc
title: $httpPut[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpPut
syntax: $httpPut[url;body?]
description: Performs an HTTP PUT request to the specified URL, optionally sending a request body, and returns the response body as a string
parameters:
  - name: url
    type: string
    required: true
    description: The full URL to send the PUT request to (including https://)
  - name: body
    type: string
    required: false
    description: The request body to send. Typically a JSON string representing the full replacement resource. Omit for an empty PUT.
returns:
  type: string
  description: The response body as a plain text string. Use $httpResult to parse JSON responses.
related:
  - httpGet
  - httpPost
  - httpPatch
  - httpDelete
  - httpAddHeader
  - httpResult
  - httpStatus
examples:
  - title: Update a resource completely
    code: |
      $httpAddHeader[Content-Type;application/json]
      $httpPut[https://jsonplaceholder.typicode.com/posts/1;{"id":1,"title":"Updated Title","body":"New content","userId":1}]
      $description[Updated: $httpResult[title] (Status: $httpStatus)]
  - title: Upload raw content
    code: |
      $httpAddHeader[Content-Type;text/plain]
      $httpPut[https://httpbin.org/put;Hello World]
      $description[Sent data: $httpResult[data]]
---
$httpPut sends a synchronous HTTP PUT request, used to replace an entire resource at the given URL. Unlike POST (which creates), PUT is idempotent and should fully replace the target resource. Always set the appropriate Content-Type header via $httpAddHeader before sending. Use $httpResult to access structured JSON responses and $httpStatus to verify the request outcome.
