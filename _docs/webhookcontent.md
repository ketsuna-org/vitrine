---
layout: doc
title: $webhookContent
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookContent
syntax: $webhookContent[webhookURL;text]
description: Stages the text content of the message for the next message sent to this webhook with $webhookSend.
---

# $webhookContent

The `$webhookContent` function stages the text content of the message for the message that will be sent to the given webhook.

## Syntax

```
$webhookContent[webhookURL;text]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |
| `text` | **Required.** The value to stage. It must contain 1 to 2000 characters; otherwise the error `Webhook text must contain 1–2000 characters.` is raised. |

Exactly two arguments are required; any other count is refused ("Invalid argument count").

## Return Value

An empty string. The value is only staged; nothing is sent yet.

## Behavior

- The value is staged per webhook URL.
- The content is the text of the message, outside the embed.
- If `$webhookSend` is called with a non-empty content argument, it replaces the staged content; if that argument is empty, the staged content is kept.
- Calling `$webhookContent` again for the same webhook replaces the staged value.
- `$webhookSend[webhookURL]` sends the staged message and clears it.
- If a staged message (with text content or an embed other than just a color) has not been sent when the script ends normally, it is sent automatically. If the script is stopped, staged webhook messages are discarded.

## Examples

### Simple content

```bdfd
$webhookContent[https://discord.com/api/webhooks/123456/abcdef;This is a message sent via webhook!]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef]
```

### With embed and content

```bdfd
$webhookContent[https://discord.com/api/webhooks/123456/abcdef;Here are the details below:]
$webhookTitle[https://discord.com/api/webhooks/123456/abcdef;Important Details]
$webhookDescription[https://discord.com/api/webhooks/123456/abcdef;The detailed information can be found here.]
$webhookColor[https://discord.com/api/webhooks/123456/abcdef;#FEE75C]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef]
```
