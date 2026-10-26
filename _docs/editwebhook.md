---
layout: doc
title: $editWebhook
translation_key: docs
category: "Webhooks"
function_name: editWebhook
syntax: $editWebhook[webhookID;name;channelID]
description: Renames a webhook or moves it to another channel.
---

# $editWebhook

Renames a webhook or moves it to another channel. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$editWebhook[webhookID;name;channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookID` | **Required.** The webhook ID (see `$listWebhooks`). |
| `name` | The new name. Empty keeps the current one. |
| `channelID` | Optional. The channel to move the webhook to. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Manage Webhooks.

## Examples

```bdfd
$editWebhook[123456789012345678;Logs]
```
