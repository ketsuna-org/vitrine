---
layout: doc
title: $httpAddHeader[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpAddHeader
syntax: $httpAddHeader[name;value]
description: Adds a custom HTTP header to all subsequent HTTP requests made with $httpGet, $httpPost, $httpPut, $httpPatch, or $httpDelete
parameters:
  - name: name
    type: string
    required: true
    description: The HTTP header name (e.g., Content-Type, Authorization, Accept)
  - name: value
    type: string
    required: true
    description: The header value to set
returns:
  type: void
  description: This function does not return a value. It modifies internal request state for subsequent HTTP calls.
related:
  - httpGet
  - httpPost
  - httpPut
  - httpPatch
  - httpDelete
  - httpResult
  - httpStatus
examples:
  - title: Set JSON content type
    code: |
      $httpAddHeader[Content-Type;application/json]
      $httpAddHeader[Accept;application/json]
      $httpPost[https://jsonplaceholder.typicode.com/posts;{"title":"Test"}]
      $description[Created: $httpResult[id]]
  - title: Authenticated API request
    code: |
      $httpAddHeader[Authorization;Bearer sk-abc123xyz]
      $httpGet[https://api.example.com/v1/me]
      $description[User: $httpResult[username] — Status: $httpStatus]
  - title: Multiple headers for a POST
    code: |
      $httpAddHeader[Content-Type;application/json]
      $httpAddHeader[Authorization;Bearer my-secret-token]
      $httpAddHeader[X-Custom-Header;custom-value]
      $httpPost[https://httpbin.org/post;{"key":"value"}]
      Response headers echoed: $httpResult[headers;X-Custom-Header]
---
$httpAddHeader sets a custom HTTP header that is included on all subsequent HTTP requests until cleared or overwritten. Call it multiple times to set multiple headers. Headers are applied to every request made via $httpGet, $httpPost, $httpPut, $httpPatch, and $httpDelete. Common use cases include setting Content-Type for JSON APIs, Authorization for authenticated endpoints, and custom headers for API-specific requirements. Headers persist for the duration of the command execution context.
