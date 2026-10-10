---
layout: doc
title: $webhookDelete
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookDelete
syntax: $webhookDelete[webhookURL]
description: Deletes an existing Discord webhook from its URL.
---

# $webhookDelete

The `$webhookDelete` function **deletes an existing Discord webhook** identified by its URL.

## Syntax

```
$webhookDelete[webhookURL]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |

Exactly one argument is required; any other count is refused ("Invalid argument count").

## Return Value

An empty string. The deletion is performed silently.

## Behavior

- The webhook is deleted through Discord using the ID and token contained in the URL.
- Any message staged for this webhook (see `$webhookSend`) is discarded.
- Once deleted, the webhook can no longer be used.

## Examples

### Deletion of a webhook

```bdfd
$webhookDelete[https://discord.com/api/webhooks/123456/abcdef]
$sendMessage[Webhook deleted.]
```
