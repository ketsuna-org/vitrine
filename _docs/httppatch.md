---
layout: doc
title: $httpPatch[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpPatch
syntax: $httpPatch[url;(body)]
description: Sends an HTTP PATCH request with an optional body, stores the response for $httpStatus and $httpResult and returns an empty string
---
$httpPatch sends an HTTP PATCH request, optionally with a body. It returns nothing itself; read the response with $httpResult and the status code with $httpStatus.

## Parameters

| Parameter | Description |
|---|---|
| `url` | Required. The full URL, with `http://` or `https://`. Surrounding spaces are removed. |
| `body` | Optional. The request body, sent as written. Without it, an empty body is sent. The `Content-Type` is not set by the engine: add it with `$httpAddHeader` when the API needs one. |

## Behavior

- The request is sent and the command waits for the response (within the command execution time budget). The function itself returns an **empty string**: the response is kept for `$httpStatus` (status code) and `$httpResult` (body). Each new request replaces the stored response of the previous one.
- Only `http://` and `https://` URLs are accepted. An empty URL raises `HTTP request URL cannot be empty.`; any other scheme raises an error.
- Headers added with `$httpAddHeader` before the call are sent with this request only.
- A network failure (connection refused, DNS error, ...) raises an error; an HTTP error status (404, 500, ...) does **not**: read it with `$httpStatus`.

## Examples

### Partially Update API Resource

```bdfd
$httpAddHeader[Content-Type;application/json]
$httpPatch[https://api.example.com/users/123;{"status":"active"}]
$title[HTTP PATCH Request]
$description[Request sent. Status: **$httpStatus**]
$color[#57F287]
```
