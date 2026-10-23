---
layout: doc
title: $httpRemoveHeader
translation_key: docs
category: "HTTP & JSON"
function_name: httpRemoveHeader
syntax: $httpRemoveHeader[Name]
description: Removes a header added with $httpAddHeader before the next HTTP request is sent.
---

# $httpRemoveHeader

Drops a header previously added with `$httpAddHeader`, before the next request.

## Syntax

```
$httpRemoveHeader[Name]
```

## Parameters

| Parameter | Description |
|---|---|
| `Name` | Required. The header name; the match ignores case. An empty name raises "HTTP header name cannot be empty.". |

## Return value

- An empty string. A name that was not added is ignored.

## Examples

```bdfd
$httpAddHeader[Authorization;Bearer abc]
$httpRemoveHeader[authorization]
$httpGet[https://example.com/api]
```

The request is sent without the `Authorization` header.
