---
layout: doc
title: $httpDelete[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpDelete
syntax: $httpDelete[url]
description: Performs an HTTP DELETE request to the specified URL and returns the response body as a string
parameters:
  - name: url
    type: string
    required: true
    description: The full URL of the resource to delete (including https://)
returns:
  type: string
  description: The response body as a plain text string. Often empty for successful deletions. Use $httpStatus to confirm the outcome.
related:
  - httpGet
  - httpPost
  - httpPut
  - httpPatch
  - httpAddHeader
  - httpResult
  - httpStatus
examples:
  - title: Delete a resource
    code: |
      $httpDelete[https://jsonplaceholder.typicode.com/posts/1]
      $if[$httpStatus==200]
        $description[Resource deleted successfully]
      $else
        $description[Deletion failed with status: $httpStatus]
      $endif
  - title: Delete with custom header
    code: |
      $httpAddHeader[Authorization;Bearer my-token-here]
      $httpDelete[https://api.example.com/items/42]
      $description[Status: $httpStatus — Response: $httpResult]
---
$httpDelete sends a synchronous HTTP DELETE request to remove the resource identified by the URL. The response body is often empty or contains a confirmation message. Use $httpStatus to verify whether the deletion succeeded (typically a 200 or 204 status code). Custom headers such as Authorization can be set beforehand with $httpAddHeader.
