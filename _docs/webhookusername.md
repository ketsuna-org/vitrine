---
layout: doc
title: $webhookUsername
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookUsername
syntax: $webhookUsername[webhookURL;name]
description: Renames the Discord webhook.
---

# $webhookUsername

The `$webhookUsername` function **renames the webhook** itself. The change is applied immediately to the Discord webhook; it is not a per-message override.

## Syntax

```
$webhookUsername[webhookURL;name]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |
| `name` | **Required.** The new name, 2 to 80 characters; otherwise the error `Webhook name must contain 2–80 characters.` is raised. |

Exactly two arguments are required; any other count is refused ("Invalid argument count").

## Return Value

An empty string.

## Behavior

- The webhook is updated on Discord when the function runs, and the new name stays until changed again.
- It does not depend on `$webhookSend` and is not reset after a send.

## Examples

### Rename a webhook

```bdfd
$webhookUsername[https://discord.com/api/webhooks/123456/abcdef;📢 Server Announcements]
```

### Rename then send

```bdfd
$webhookUsername[https://discord.com/api/webhooks/123456/abcdef;Notifier]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;New update available!]
```
