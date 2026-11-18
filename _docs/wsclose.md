---
layout: doc
title: $wsClose[]
translation_key: docs
category: "HTTP & JSON"
function_name: wsClose
syntax: $wsClose[source]
description: Closes a WebSocket source. Returns an empty string
---
$wsClose closes the connection of a WebSocket source cleanly (code 1000). It does nothing if the source is already closed. It returns nothing.

## Parameters

| Parameter | Description |
|---|---|
| `source` | Required. The name of a source declared on the bot's WebSocket page. |

## Behavior

- A **permanent** source closed this way stays closed until the bot restarts, or until `$wsJoin` opens it again.
- The workflow of the source receives a `close` event (`((ws.event))`).
- Errors: `ws_unknown_source`, `ws_unavailable`.

## Examples

```bdfd
$wsClose[partie]
```
