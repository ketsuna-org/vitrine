---
layout: doc
title: $wsJoin[]
translation_key: docs
category: "HTTP & JSON"
function_name: wsJoin
syntax: $wsJoin[source;(context)]
description: Opens a WebSocket source declared on the bot's WebSocket page and plays its join sequence. Returns an empty string
premium: true
---
$wsJoin opens the connection of a **WebSocket source** declared on the bot's WebSocket page, plays the source's join sequence (authentication, subscription...) and returns once the connection is ready. It returns nothing itself.

## Parameters

| Parameter | Description |
|---|---|
| `source` | Required. The name of a source declared on the bot's WebSocket page. A free URL is **never** accepted. |
| `context` | Optional. A short text (200 characters at most) kept with the connection and given to the workflow as `((ws.context))`, for example the channel ID to answer in. Each call replaces the previous value. |

## Behavior

- Calling it on a source that is already open does nothing except postpone its inactivity timer.
- An **on-demand** source closes by itself after 10 minutes (configurable) without `$wsJoin` or `$wsSend` from the bot, and at most 60 minutes after opening. Messages received do not keep it open.
- Premium only. At most 3 sources are open at the same time per bot.
- Errors: `ws_unknown_source`, `ws_source_disabled`, `ws_too_many_open`, `ws_runner_busy`, `ws_join_timeout`, `ws_join_refused`, `ws_auth_refused`, `ws_handshake_failed`, `ws_connect_timeout`, `ws_address_refused`, `ws_connect_failed`, and `ws_unavailable` when the bot does not run on a runner (a phone cannot hold a connection).
- Every message received then starts the source's workflow (see `$wsSend` and the WebSocket page).

## Examples

### Follow a game while a command is used

```bdfd
$wsJoin[partie;$channelID]
Following the game in this channel.
```
