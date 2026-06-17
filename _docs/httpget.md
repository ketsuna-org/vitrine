---
layout: doc
title: $httpGet[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpGet
syntax: $httpGet[url]
description: Performs an HTTP GET request to the specified URL and returns the response body as a string
parameters:
  - name: url
    type: string
    required: true
    description: The full URL to fetch (including https://). Query parameters should be included directly in the URL.
returns:
  type: string
  description: The response body as a plain text string. The response can be parsed as JSON using $httpResult for structured access.
related:
  - httpPost
  - httpPut
  - httpPatch
  - httpDelete
  - httpAddHeader
  - httpResult
  - httpStatus
examples:
  - title: Fetch a public API
    code: |
      $httpGet[https://api.github.com/users/octocat]
      $description[GitHub user: $httpResult[name] has $httpResult[followers] followers]
  - title: Fetch with query parameters
    code: |
      $httpGet[https://jsonplaceholder.typicode.com/posts?userId=1]
      $description[First post title: $httpResult[0;title]]
  - title: Fetch and inspect status
    code: |
      $httpGet[https://httpbin.org/get]
      Status: $httpStatus
      Origin IP: $httpResult[origin]
---
$httpGet sends a synchronous HTTP GET request to the provided URL. The function blocks the command execution until a response is received or the request times out. Custom headers can be added before the call using $httpAddHeader. After the request completes, the raw response body is stored internally and can be accessed via $httpResult. Use $httpStatus to check the HTTP status code of the response.

The URL must be a fully qualified URL including the scheme (https:// or http://). For best results with JSON APIs, use $httpResult with dot or bracket notation to extract specific fields from the parsed JSON response.
