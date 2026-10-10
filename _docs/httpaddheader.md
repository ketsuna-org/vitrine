---
layout: doc
title: $httpAddHeader[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpAddHeader
syntax: $httpAddHeader[name;value]
description: Sets a header for the next HTTP request made with $httpGet, $httpPost, $httpPut, $httpPatch, $httpDelete or $httpHead; the header is cleared after that request. Returns an empty string.
---
$httpAddHeader[name;value] stores a header that is sent with the **next** HTTP request only. Call it once per header before the request function. It returns an empty string.

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. The header name; surrounding spaces are removed. An empty name raises `HTTP header name cannot be empty.` |
| `value` | Required (may be empty). The header value, used as written (spaces are kept). |

## Behavior

- The pending headers are consumed by the next `$httpGet`, `$httpPost`, `$httpPut`, `$httpPatch`, `$httpDelete` or `$httpHead`: after that request they are cleared. A second request needs its own `$httpAddHeader` calls.
- The headers are cleared as soon as the request starts, including when the request then fails with an error.
- Calling it again with the same name (compared case-insensitively) replaces the previous value instead of adding a second header.
- The engine does not add a `Content-Type` of its own to JSON bodies: a `POST` with a body and no `Content-Type` header is sent with the HTTP client's default (`text/plain; charset=utf-8` in a local test), so set `Content-Type` when the API needs `application/json`.

## Examples

### Custom Headers for API Authentication

```bdfd
$httpAddHeader[Authorization;Bearer secret_api_token]
$httpAddHeader[Content-Type;application/json]
$httpGet[https://api.example.com/v1/profile]
$title[API Request with Custom Headers]
$description[Status: **$httpStatus**
Result: `$httpResult`]
$color[#00BCD4]
```
