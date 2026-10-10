---
layout: doc
title: $webhookTitle
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookTitle
syntax: $webhookTitle[webhookURL;title]
description: Stages the title of the embed for the next message sent to this webhook with $webhookSend.
---

# $webhookTitle

The `$webhookTitle` function stages the title of the embed for the message that will be sent to the given webhook.

## Syntax

```
$webhookTitle[webhookURL;title]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |
| `title` | **Required.** The value to stage. It must contain 1 to 256 characters; otherwise the error `Webhook text must contain 1–256 characters.` is raised. |

Exactly two arguments are required; any other count is refused ("Invalid argument count").

## Return Value

An empty string. The value is only staged; nothing is sent yet.

## Behavior

- The value is staged per webhook URL.
- The title is part of the embed, which is sent with `$webhookSend`.
- Calling `$webhookTitle` again for the same webhook replaces the staged value.
- `$webhookSend[webhookURL]` sends the staged message and clears it.
- If a staged message (with text content or an embed other than just a color) has not been sent when the script ends normally, it is sent automatically. If the script is stopped, staged webhook messages are discarded.

## Examples

### Embed with a title

```bdfd
$webhookTitle[https://discord.com/api/webhooks/123456/abcdef;✅ Task Completed]
$webhookDescription[https://discord.com/api/webhooks/123456/abcdef;The automatic data backup was completed successfully.]
$webhookColor[https://discord.com/api/webhooks/123456/abcdef;#57F287]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef]
```
