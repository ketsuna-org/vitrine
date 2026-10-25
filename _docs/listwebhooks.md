---
layout: doc
title: $listWebhooks
translation_key: docs
category: "Webhooks"
function_name: listWebhooks
syntax: $listWebhooks[channelID]
description: Returns the webhooks of a channel as a JSON array.
---

# $listWebhooks

Returns the webhooks of a channel as a JSON array. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$listWebhooks[channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. Empty means the current channel. |

## Return Value

- **Type**: String (JSON)
- A JSON array of webhooks (ID, name, channel, URL); empty array when none. Read it with the `$json` functions.

## Behavior

- The bot needs Manage Webhooks.
- The URLs contain the webhook token: do not post them in a public channel.

## Examples

```bdfd
$jsonParse[$listWebhooks]
$jsonArrayCount
```
