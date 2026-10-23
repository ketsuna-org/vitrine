---
layout: doc
title: $httpGetHeader
translation_key: docs
category: "HTTP & JSON"
function_name: httpGetHeader
syntax: $httpGetHeader[Key]
description: Returns the value of a header of the response to the latest HTTP request.
---

# $httpGetHeader

Reads a header of the **response** of the most recent request made with `$httpGet`, `$httpPost`, `$httpPut`, `$httpPatch`, `$httpDelete` or `$httpHead`.

## Syntax

```
$httpGetHeader[Key]
```

## Parameters

| Parameter | Description |
|---|---|
| `Key` | Required. The header name; the match ignores case. An empty name raises "HTTP header name cannot be empty.". |

## Return value

- The header value, or an empty string if the response does not have this header.
- Without a preceding HTTP request, the error "A preceding HTTP request is required." is raised.

## Examples

```bdfd
$httpGet[https://example.com/api]
Content type: $httpGetHeader[content-type]
```
