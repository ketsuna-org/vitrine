---
layout: doc
title: $webhookDescription
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookDescription
syntax: $webhookDescription[webhookURL;description]
description: Stages the description (body) of the embed for the next message sent to this webhook with $webhookSend.
---

# $webhookDescription

The `$webhookDescription` function stages the description (body) of the embed for the message that will be sent to the given webhook.

## Syntax

```
$webhookDescription[webhookURL;description]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |
| `description` | **Required.** The value to stage. It must contain 1 to 4096 characters; otherwise the error `Webhook text must contain 1–4096 characters.` is raised. |

Exactly two arguments are required; any other count is refused ("Invalid argument count").

## Return Value

An empty string. The value is only staged; nothing is sent yet.

## Behavior

- The value is staged per webhook URL.
- The description is part of the embed, which is sent with `$webhookSend`.
- Calling `$webhookDescription` again for the same webhook replaces the staged value.
- `$webhookSend[webhookURL]` sends the staged message and clears it.
- If a staged message (with text content or an embed other than just a color) has not been sent when the script ends normally, it is sent automatically. If the script is stopped, staged webhook messages are discarded.

## Examples

### Simple description

```bdfd
$webhookTitle[https://discord.com/api/webhooks/123456/abcdef;Server Statistics]
$webhookDescription[https://discord.com/api/webhooks/123456/abcdef;**Members:** $memberCount]
$webhookColor[https://discord.com/api/webhooks/123456/abcdef;#5865F2]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef]
```
