---
layout: doc
title: $httpStatus[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpStatus
syntax: $httpStatus[]
description: Returns the numeric HTTP status code of the most recent HTTP request (made with $httpGet, $httpPost, $httpPut, $httpPatch, $httpDelete or $httpHead)
---
$httpStatus returns the status code of the response stored by the most recent HTTP request function, as a number text such as `200` or `404`. It takes no argument.

## Behavior

- An HTTP error status (4xx, 5xx) is returned like any other: the request functions do not raise an error for it, so test the code with `$if` to handle failures.
- If no HTTP request has been made yet in the command, it raises the error `A preceding HTTP request is required.`
- Each new request replaces the stored response.
- A request that fails at the network level (connection refused, ...) raises an error and does not produce a status.

## Examples

### Verify API Status Code

```bdfd
$httpGet[https://httpbin.org/status/200]
$title[HTTP Status Check]
$description[API endpoint returned HTTP status code: **$httpStatus** ✅]
$color[#57F287]
```

### Handle a failure

```bdfd
$httpGet[https://api.example.com/items]
$if[$httpStatus==200]
  $sendMessage[OK: $httpResult]
$else
  $sendMessage[Request failed with status $httpStatus.]
$endif
```
