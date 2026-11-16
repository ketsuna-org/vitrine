---
layout: doc
title: $editWebhook
translation_key: docs
category: "Webhooks"
function_name: editWebhook
syntax: $editWebhook[webhookID;name;channelID;(reason)]
description: Renames a webhook or moves it to another channel.
---

# $editWebhook

Renames a webhook or moves it to another channel. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$editWebhook[webhookID;name;channelID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookID` | **Required.** The webhook ID (see `$listWebhooks`). |
| `name` | The new name. Empty keeps the current one. |
| `channelID` | Optional. The channel to move the webhook to. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Manage Webhooks.

## Examples

```bdfd
$editWebhook[123456789012345678;Logs]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
