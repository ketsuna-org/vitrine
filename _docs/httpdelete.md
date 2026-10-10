---
layout: doc
title: $httpDelete[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpDelete
syntax: $httpDelete[url;(body)]
description: Sends an HTTP DELETE request (optionally with a body), stores the response for $httpStatus and $httpResult and returns an empty string
---
$httpDelete sends an HTTP DELETE request. It returns nothing itself; read the response with $httpResult and the status code with $httpStatus (an error status does not raise an error, so check it).

## Parameters

| Parameter | Description |
|---|---|
| `url` | Required. The full URL, with `http://` or `https://`. Surrounding spaces are removed. |
| `body` | Optional. The request body, sent as written when given (DELETE does send a body in this engine). Usually omitted. |

## Behavior

- The request is sent and the command waits for the response (within the command execution time budget). The function itself returns an **empty string**: the response is kept for `$httpStatus` (status code) and `$httpResult` (body). Each new request replaces the stored response of the previous one.
- Only `http://` and `https://` URLs are accepted. An empty URL raises `HTTP request URL cannot be empty.`; any other scheme raises an error.
- Headers added with `$httpAddHeader` before the call are sent with this request only.
- A network failure (connection refused, DNS error, ...) raises an error; an HTTP error status (404, 500, ...) does **not**: read it with `$httpStatus`.

## Examples

### Delete API Resource

```bdfd
$httpDelete[https://api.example.com/items/42]
$title[HTTP DELETE Request]
$description[Request sent. Status response code: **$httpStatus**]
$color[#DA373C]
```
