---
layout: doc
title: $inboundHeader[]
translation_key: docs
category: "HTTP & JSON"
function_name: inboundHeader
syntax: $inboundHeader[name]
description: Reads an HTTP header received by an inbound webhook
---
$inboundHeader returns the value of an HTTP header of the request that triggered the inbound webhook. The name is matched without regard to case. A missing header returns an empty value.

The same data is available as `((inbound.header.<name in lowercase>))`. In a JavaScript bot, read `webhook.headers`. The caller's address and the request id are `((inbound.source.ip))` and `((inbound.request.id))` (`webhook.sourceIp` and `webhook.requestId` in JavaScript).

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. The header name, for example `X-Event` or `content-type`. |

## Examples

```bdfd
$if[$inboundHeader[X-Github-Event]==push]
$sendMessage[A push was received.]
$endif
```
