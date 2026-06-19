---
layout: doc
title: $httpResult[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpResult
syntax: $httpResult[key?]
description: Retrieves the full response body of the last HTTP request, or extracts a specific field from a JSON response using the given key
parameters:
  - name: key
    type: string
    required: false
    description: A dot-separated or bracket-indexed path into the JSON response (e.g., "name", "user;profile;avatar", "0;title"). If omitted, returns the entire raw response body.
returns:
  type: string
  description: The response body or the extracted value at the specified key path. Returns an empty string if the key does not exist or the response is not valid JSON.
related:
  - httpGet
  - httpPost
  - httpPut
  - httpPatch
  - httpDelete
  - httpAddHeader
  - httpStatus
examples:
  - title: Extract a top-level field
    code: |
      $httpGet[https://api.github.com/users/octocat]
      $description[Login: "$httpResult[login] — Repos: $httpResult[public_repos]]"
  - title: Access nested JSON fields
    code: |
      $httpGet[https://api.github.com/repos/bot-maker/bot-creator]
      $description[Owner: "$httpResult[owner;login] — Stars: $httpResult[stargazers_count]]"
  - title: Array indexing
    code: |
      $httpGet[https://jsonplaceholder.typicode.com/posts]
      First post: $httpResult[0;title]
      Second post: $httpResult[1;title]
  - title: Raw response
    code: |
      $httpGet[https://httpbin.org/uuid]
      Raw UUID: $httpResult
---
$httpResult provides access to the response from the most recent HTTP request. When called without arguments, it returns the raw response body as a string. When a key path is provided, it parses the response as JSON and navigates to the specified field using semicolons (;) as path separators. Numeric indices access array elements. Use $httpResult to extract meaningful data from API responses and display it with other BDFD functions.
