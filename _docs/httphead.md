---
layout: doc
title: $httpHead[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpHead
syntax: $httpHead[url;(body)]
description: Sends an HTTP HEAD request to a URL and keeps the response for $httpStatus.
---

# $httpHead[]

`$httpHead[url;(body)]` sends an HTTP `HEAD` request. Like the other HTTP functions, it returns an empty string; the status code of the response is then available with [$httpStatus](/docs/httpstatus/) (a `HEAD` response has no useful body).

## Parameters

| Parameter | Description |
|---|---|
| `url` | The URL to request. Required; an empty URL raises "HTTP request URL cannot be empty." |
| `body` | Optional request body. |

Headers added with `$httpAddHeader` before the call are sent with the request and then cleared.

## Example

```bdfd
$httpHead[https://example.com]
Status: $httpStatus
```

See also [$httpGet](/docs/httpget/), [$httpPost](/docs/httppost/).
