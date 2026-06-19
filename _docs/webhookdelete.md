---
layout: doc
title: $webhookDelete
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookDelete
syntax: $webhookDelete[webhookID;webhookToken]
description: Deletes an existing Discord webhook using its ID and token. Useful for cleaning up dynamically created webhooks.
---

# $webhookDelete

The `$webhookDelete` function allows you to **delete an existing Discord webhook** using its ID and token.

## Syntax

```
$webhookDelete[webhookID;webhookToken]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookID` | The ID of the webhook (first part of the URL after `/webhooks/`). |
| `webhookToken` | The token of the webhook (second part after the ID). |

## Return Value

This function does not return a value. The deletion is performed silently.

## Behavior

- The bot must have the `MANAGE_WEBHOOKS` permission or be the creator of the webhook.
- Once deleted, the webhook can no longer be used.
- Remaining URLs pointing to this webhook will become invalid.

## Examples

### Deletion of a webhook

```bdfd
$let[hookID;123456789]
$let[hookToken;abcdefghijklmnop]
$webhookDelete[$hookID;$hookToken]
$sendMessage[Webhook deleted.]
```

### Extraction from a stored URL

```bdfd
$let[url;$getUserVar[tempHook]]
$let[parts;$splitText[$url;/]]
$let[hookID;$getTextSplitIndex[$parts;5]]
$let[hookToken;$getTextSplitIndex[$parts;6]]
$webhookDelete[$hookID;$hookToken]
$sendMessage[Webhook cleaned up.]
```

## Notes

- Webhooks created via the Discord interface can only be deleted by an administrator.
- Webhooks created by the bot can be deleted by it.
- Delete temporary webhooks after use to avoid accumulation.
