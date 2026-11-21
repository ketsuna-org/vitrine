---
layout: doc
title: $wsSend[]
translation_key: docs
category: "HTTP & JSON"
function_name: wsSend
syntax: $wsSend[source;message]
description: Sends a text message on an open WebSocket source. Returns an empty string
---
$wsSend sends a text message on a WebSocket source that is open (permanent, or opened with `$wsJoin`). It returns nothing.

## Parameters

| Parameter | Description |
|---|---|
| `source` | Required. The name of a source declared on the bot's WebSocket page. |
| `message` | Required. The text to send, 256 KiB at most by default. |

## Behavior

- Errors: `ws_unknown_source`, `ws_not_open` (the source is not open: call `$wsJoin` first), `ws_message_too_big`, `ws_send_rate` (more than 60 sends per minute on the source), `ws_unavailable`.
- Sending postpones the inactivity timer of an on-demand source.
- Secrets never go in the message of a script: declare them on the WebSocket page and cite them as `{{secret.NAME}}` in the join sequence.

## Examples

```bdfd
$wsSend[partie;{"op":"ping"}]
```
