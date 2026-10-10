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
| `channelID` | Required. The ID of the channel where the webhook will be created (digits only, greater than 0, otherwise the error `Invalid channel ID.` is raised). It must be a server channel and not a thread. |
| `name` | Required. The name of the webhook (2 to 80 characters, otherwise `Webhook name must contain 2–80 characters.` is raised). |
| `avatarURL` | Optional - `http` or `https` URL of the avatar image of the webhook (otherwise `An HTTP(S) URL is required.`). |

## Return Value

- **Type**: String (URL)
- The complete URL of the webhook in the format `https://discord.com/api/webhooks/ID/TOKEN`
- An error is raised (nothing is returned) if the bot does not have the Manage Webhooks permission in the channel: `Manage Webhooks permission is required.`

## Behavior

- Requires the Manage Webhooks permission for the bot in the target channel.
- The channel must be a server channel and not a thread (`Webhook creation requires a guild channel.`).
- The avatar is downloaded by the bot when the function runs; it must be an image of type PNG, JPEG, GIF or WEBP, answered with HTTP 200 and at most 8 MiB, otherwise an error is raised.
- If Discord does not return a usable token for the new webhook, the error `Created webhook has no usable token.` is raised.

## Examples

### Simple creation

```bdfd
$var[hook;$webhookCreate[$channelID;Server Logger]]
$webhookSend[$var[hook];Webhook for logs created successfully!]
```

### Creation with storage

```bdfd
$var[logHook;$webhookCreate[$channelID;Logs;$serverIcon]]
$setUserVar[logWebhook;$var[logHook]]
$sendMessage[Webhook of logs configured!]
```

## Notes

- A failure (missing permission, invalid argument, Discord error) stops the script with an error instead of returning an empty value.
- Delete unused webhooks with `$webhookDelete[]`.
- The webhook URL contains its token: do not expose it publicly.
