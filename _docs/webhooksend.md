---
layout: doc
title: $webhookSend
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookSend
syntax: $webhookSend[webhookURL;content]
description: Sends a message via a Discord webhook. Allows sending formatted content, embeds, and files to an external or internal channel using a webhook URL.
---

# $webhookSend

The `$webhookSend` function allows you to **send a message via a Discord webhook**. This is the main entry point for using webhooks with BDFD.

## Syntax

```
$webhookSend[webhookURL;content]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | The complete URL of the Discord webhook (`https://discord.com/api/webhooks/ID/TOKEN`). |
| `content` | The text content of the message to send. Supports markdown and emojis. |

## Return Value

This function does not return a value directly. The message is sent via the Discord webhook API.

## Behavior

- If the webhook is invalid or expired, the sending fails silently.
- The content can include line breaks, markdown, and mentions.
- Webhook embed functions (`$webhookTitle`, `$webhookDescription`, etc.) must be placed **before** `$webhookSend` in the code.
- `$webhookSend` must be the **last** webhook function called, because it triggers the actual delivery.

## Examples

### Simple sending

```bdfd
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;Hello World!]
```

### Sending with embed

```bdfd
$webhookTitle[Title of the embed]
$webhookDescription[Detailed description here]
$webhookColor[#5865F2]
$webhookFooter[Footer text]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;]
```

### Conditional sending

```bdfd
$if[$checkContains[$message;!annonce]==true]
  $webhookTitle[New announcement]
  $webhookDescription[$message]
  $webhookSend[$webhookURL;]
$endif
```

## Notes

- Webhook URLs are sensitive: never expose them in public code.
- Store webhook URLs in environment variables or constants.
- A webhook can send up to 10 embeds per message.
- The limit of characters per message is 2000 for the text content.
