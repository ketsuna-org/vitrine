---
layout: doc
title: $httpGet[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpGet
syntax: $httpGet[url;(body)]
description: Sends an HTTP GET request to the URL, stores the response for $httpStatus and $httpResult and returns an empty string
---
$httpGet sends an HTTP GET request to the URL. It returns nothing itself; read the response with $httpResult and the status code with $httpStatus.

## Parameters

| Parameter | Description |
|---|---|
| `url` | Required. The full URL, with `http://` or `https://`. Surrounding spaces are removed. |
| `body` | Optional. Accepted for uniformity but **ignored**: no body is sent with GET. |

## Behavior

- The request is sent and the command waits for the response (within the command execution time budget). The function itself returns an **empty string**: the response is kept for `$httpStatus` (status code) and `$httpResult` (body). Each new request replaces the stored response of the previous one.
- Only `http://` and `https://` URLs are accepted. An empty URL raises `HTTP request URL cannot be empty.`; any other scheme raises an error.
- Headers added with `$httpAddHeader` before the call are sent with this request only.
- A network failure (connection refused, DNS error, ...) raises an error; an HTTP error status (404, 500, ...) does **not**: read it with `$httpStatus`.

## Examples

### Fetch GitHub Repository Info

```bdfd
$httpGet[https://api.github.com/repos/ketsuna-org/bot-creator]
$title[GitHub Repository Info]
$description[Status: **$httpStatus**
Name: `$httpResult[name]`]
$color[#00BCD4]
```
