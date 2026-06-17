---
layout: doc
title: $httpPost[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpPost
syntax: $httpPost[url;body?]
description: Performs an HTTP POST request to the specified URL, optionally sending a request body, and returns the response body as a string
parameters:
  - name: url
    type: string
    required: true
    description: The full URL to send the POST request to (including https://)
  - name: body
    type: string
    required: false
    description: The request body to send. Typically a JSON string, form-encoded data, or plain text. Omit for an empty POST.
returns:
  type: string
  description: The response body as a plain text string. Use $httpResult to parse JSON responses.
related:
  - httpGet
  - httpPut
  - httpPatch
  - httpDelete
  - httpAddHeader
  - httpResult
  - httpStatus
examples:
  - title: Create a resource via JSON API
    code: |
      $httpAddHeader[Content-Type;application/json]
      $httpPost[https://jsonplaceholder.typicode.com/posts;{"title":"Hello","body":"World","userId":1}]
      Created post ID: $httpResult[id]
      Status: $httpStatus
  - title: Submit form data
    code: |
      $httpPost[https://httpbin.org/post;name=Bot&action=greet]
      $description[Response: $httpResult[form;name]]
  - title: Post with JSON parsing
    code: |
      $httpAddHeader[Content-Type;application/json]
      $httpPost[https://api.example.com/login;{"username":"admin","password":"secret"}]
      $if[$httpStatus==200]
        Token: $httpResult[token]
      $else
        Login failed
      $endif
---
$httpPost sends a synchronous HTTP POST request to the provided URL. This is typically used to create resources, submit form data, or send data to an API endpoint. Always set the Content-Type header via $httpAddHeader when sending JSON bodies. The response body is stored internally and can be accessed with $httpResult; use $httpStatus to check the response status code.
