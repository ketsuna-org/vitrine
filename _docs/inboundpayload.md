---
layout: doc
title: $inboundPayload[]
translation_key: docs
category: "HTTP & JSON"
function_name: inboundPayload
syntax: $inboundPayload[(path)]
description: Reads a field of the JSON body received by an inbound webhook
---
$inboundPayload reads the JSON body that a caller sent to the bot's inbound webhook. Use `.` to go into nested objects and a number to pick an item of an array (`user.tags.0`). A missing field, or a run that is not an inbound webhook, returns an empty value. Without argument it returns the whole body as JSON, which you can pass to `$jsonParse`.

The same data is available as `((inbound.payload.<key>))` (top-level keys only) and `((inbound.payload.json))`. In a JavaScript bot, read `webhook.payload`.

## Parameters

| Parameter | Description |
|---|---|
| `path` | Optional. The field to read, for example `userID` or `user.name`. Array items use their index: `items.0.id`. Without it, the whole body is returned as JSON. |

## Examples

```bdfd
$sendMessage[Received for user $inboundPayload[userID]]
```

```bdfd
$sendMessage[Hello $inboundPayload[user.name]!]
```
