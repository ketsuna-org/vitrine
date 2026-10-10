---
layout: doc
title: $webhookAvatarURL
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookAvatarURL
syntax: $webhookAvatarURL[webhookURL;url]
description: Changes the avatar of the Discord webhook from an image URL.
---

# $webhookAvatarURL

The `$webhookAvatarURL` function **changes the avatar of the webhook** itself. The change is applied immediately to the Discord webhook; it is not a per-message override.

## Syntax

```
$webhookAvatarURL[webhookURL;url]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |
| `url` | **Required.** An `http` or `https` URL of the image. Otherwise the error `An HTTP(S) URL is required.` is raised. |

Exactly two arguments are required; any other count is refused ("Invalid argument count").

## Return Value

An empty string.

## Behavior

- The image is downloaded by the bot when the function runs, then set as the webhook avatar. The download fails if the response is not HTTP 200 or if the image exceeds 8 MiB.
- The avatar stays until changed again; it is not reset after a send.

## Examples

### Custom avatar

```bdfd
$webhookAvatarURL[https://discord.com/api/webhooks/123456/abcdef;https://cdn.example.com/avatars/notif.png]
```

### Avatar of the author

```bdfd
$webhookAvatarURL[https://discord.com/api/webhooks/123456/abcdef;$authorAvatar]
```
