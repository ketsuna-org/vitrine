---
layout: doc
title: $webhookCreate
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookCreate
syntax: $webhookCreate[channelID;name;(avatarURL)]
description: Creates a new webhook in a specified channel and returns its URL. The created webhook can then be used with $webhookSend to send messages.
---

# $webhookCreate

The `$webhookCreate` function allows you to **create a new webhook** in a Discord channel and returns its complete URL.

## Syntax

```
$webhookCreate[channelID;name;(avatarURL)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel where the webhook will be created. |
| `name` | The name of the webhook (2 to 80 characters). |
| `avatarURL` | Optional - URL of the avatar image of the webhook. |

## Return Value

- **Type**: String (URL)
- The complete URL of the webhook in the format `https://discord.com/api/webhooks/ID/TOKEN`
- Empty string or error if the bot does not have the `MANAGE_WEBHOOKS` permission.

## Behavior

- Requires the `MANAGE_WEBHOOKS` permission in the target channel.
- The name must be between 2 and 80 characters.
- The avatar must be a valid URL pointing to an image (PNG, JPG, GIF, WEBP).
- A channel can have up to 10 webhooks (or 100 for community-enabled servers).

## Examples

### Simple creation

```bdfd
$let[hook;$webhookCreate[$channelID;Server Logger]]
$if[$hook!=]
  $webhookSend[$hook;Webhook for logs created successfully!]
$else
  $sendMessage[Failure: MANAGE_WEBHOOKS permission required.]
$endif
```

### Creation with storage

```bdfd
$let[logHook;$webhookCreate[$channelID;Logs;$serverIcon]]
$setUserVar[logWebhook;$logHook]
$sendMessage[Webhook of logs configured!]
```

## Notes

- Webhooks created by the bot are linked to the bot.
- A webhook cannot be moved to another channel after creation.
- Delete unused webhooks with `$webhookDelete[]`.
