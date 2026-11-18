---
layout: doc
title: $wsStatus[]
translation_key: docs
category: "HTTP & JSON"
function_name: wsStatus
syntax: $wsStatus[source]
description: Returns closed, connecting, open or error for a WebSocket source
---
$wsStatus returns the state of a WebSocket source: `closed`, `connecting` (opening or reconnecting), `open`, or `error` (stopped after repeated refusals, a message that was too large, or a flood).

## Parameters

| Parameter | Description |
|---|---|
| `source` | Required. The name of a source declared on the bot's WebSocket page. An unknown name returns `closed`. |

## Examples

```bdfd
$if[$wsStatus[partie]!=open]
$wsJoin[partie;$channelID]
$endif
```
