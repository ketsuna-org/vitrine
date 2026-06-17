---
layout: doc
title: $httpStatus[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpStatus
syntax: $httpStatus[]
description: Returns the HTTP status code from the most recent HTTP request made by $httpGet, $httpPost, $httpPut, $httpPatch, or $httpDelete
returns:
  type: integer
  description: The HTTP status code as an integer (e.g., 200 for success, 404 for not found, 500 for server error). Returns 0 if no HTTP request has been made yet.
related:
  - httpGet
  - httpPost
  - httpPut
  - httpPatch
  - httpDelete
  - httpAddHeader
  - httpResult
examples:
  - title: Basic status check
    code: |
      $httpGet[https://jsonplaceholder.typicode.com/posts/1]
      Status code: $httpStatus
      Response: $httpResult[title]
  - title: Conditional handling based on status
    code: |
      $httpGet[https://api.example.com/data]
      $if[$httpStatus==200]
        $description[Data loaded: $httpResult[data]]
      $elseIf[$httpStatus==404]
        $description[Resource not found]
      $elseIf[$httpStatus==401]
        $description[Unauthorized — check your token]
      $else
        $description[Unexpected error: $httpStatus]
      $endif
  - title: Status after different request methods
    code: |
      $httpGet[https://httpbin.org/get]
      GET status: $httpStatus

      $httpPost[https://httpbin.org/post;{"test":true}]
      POST status: $httpStatus

      $httpDelete[https://httpbin.org/delete]
      DELETE status: $httpStatus
---
$httpStatus returns the numeric HTTP status code from the last HTTP request executed by any of the HTTP functions. This is essential for error handling: check whether the request succeeded (200–299), was redirected (300–399), failed due to client error (400–499), or encountered a server error (500–599). Combine $httpStatus with $if conditionals to build robust API interactions that gracefully handle failures.
