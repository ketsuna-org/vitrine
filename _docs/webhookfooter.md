---
layout: doc
title: $webhookFooter
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookFooter
syntax: $webhookFooter[webhookURL;text]
description: Stages the footer text of the embed for the next message sent to this webhook with $webhookSend.
---

# $webhookFooter

The `$webhookFooter` function stages the footer text of the embed for the message that will be sent to the given webhook.

## Syntax

```
$webhookFooter[webhookURL;text]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |
| `text` | **Required.** The value to stage. It must contain 1 to 2048 characters; otherwise the error `Webhook text must contain 1–2048 characters.` is raised. |

Exactly two arguments are required; any other count is refused ("Invalid argument count").

## Return Value

An empty string. The value is only staged; nothing is sent yet.

## Behavior

- The value is staged per webhook URL.
- The footer is stored as the footer text of the embed.
- Calling `$webhookFooter` again for the same webhook replaces the staged value.
- `$webhookSend[webhookURL]` sends the staged message and clears it.
- If a staged message (with text content or an embed other than just a color) has not been sent when the script ends normally, it is sent automatically. If the script is stopped, staged webhook messages are discarded.

## Examples

### Footer

```bdfd
$webhookTitle[https://discord.com/api/webhooks/123456/abcdef;Command Log]
$webhookDescription[https://discord.com/api/webhooks/123456/abcdef;Command executed by $username]
$webhookFooter[https://discord.com/api/webhooks/123456/abcdef;Logger]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef]
```
