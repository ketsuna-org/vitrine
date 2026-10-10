---
layout: doc
title: $webhookColor
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookColor
syntax: $webhookColor[webhookURL;color]
description: Stages the color of the sidebar of the embed for the next message sent to this webhook with $webhookSend.
---

# $webhookColor

The `$webhookColor` function stages the **color of the embed** (left sidebar) for the message that will be sent to the given webhook.

## Syntax

```
$webhookColor[webhookURL;color]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |
| `color` | **Required.** `#` followed by hexadecimal digits (`#57F287`), a value made only of digits (read as a **decimal** number, e.g. `5763719`), or any other value read as hexadecimal without `#` (e.g. `5865F2`). The result must be between `0` and `0xFFFFFF`, otherwise `Invalid webhook color.` is raised. |

Exactly two arguments are required; any other count is refused ("Invalid argument count").

## Return Value

An empty string. The color is only staged; nothing is sent yet.

## Behavior

- A color alone does not make a sendable message: the message must also have text content or an embed field such as a title or description. Otherwise `$webhookSend` raises `Webhook message cannot be empty.`
- Calling `$webhookColor` again for the same webhook replaces the staged color.
- The staged data is cleared after `$webhookSend`.

## Examples

### Colored embed

```bdfd
$webhookTitle[https://discord.com/api/webhooks/123456/abcdef;Success]
$webhookDescription[https://discord.com/api/webhooks/123456/abcdef;The operation was completed successfully.]
$webhookColor[https://discord.com/api/webhooks/123456/abcdef;#57F287]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef]
```

### Conditional colors

```bdfd
$if[$checkContains[$message;error]==true]
  $webhookColor[https://discord.com/api/webhooks/123456/abcdef;#ED4245]
  $webhookTitle[https://discord.com/api/webhooks/123456/abcdef;Error Detected]
$else
  $webhookColor[https://discord.com/api/webhooks/123456/abcdef;#5865F2]
  $webhookTitle[https://discord.com/api/webhooks/123456/abcdef;Information]
$endif
$webhookDescription[https://discord.com/api/webhooks/123456/abcdef;$message]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef]
```

## Notes

- Use consistent colors for readability: red for errors, green for success, blue for info.
