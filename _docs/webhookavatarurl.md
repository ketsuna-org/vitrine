---
layout: doc
title: $webhookAvatarURL
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookAvatarURL
syntax: $webhookAvatarURL[url]
description: Sets the URL of the avatar for the next message sent via $webhookSend. Must be placed before the call to $webhookSend.
---

# $webhookAvatarURL

The `$webhookAvatarURL` function allows you to **set the avatar** that will be used during the next delivery via `$webhookSend`.

## Syntax

```
$webhookAvatarURL[url]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | The URL of the image to use as an avatar. Supported formats: PNG, JPG, GIF, WEBP. |

## Return Value

This function does not return a value. It only sets the avatar for the next call to `$webhookSend`.

## Behavior

- The URL must be publicly accessible.
- The image is downloaded by Discord at the time of sending.
- The avatar is reset after each `$webhookSend`.
- If the URL is invalid, the default avatar of the webhook is used.

## Examples

### Custom avatar

```bdfd
$webhookAvatarURL[https://cdn.example.com/avatars/notif.png]
$webhookUsername[System]
$webhookContent[New notification!]
$webhookSend[$webhookURL;]
```

### Dynamic avatar

```bdfd
$webhookAvatarURL[$authorAvatar]
$webhookUsername[$username]
$webhookContent[$message]
$webhookSend[$webhookURL;]
```

### Server avatar

```bdfd
$webhookAvatarURL[$serverIcon]
$webhookUsername[$serverName]
$webhookTitle[Welcome!]
$webhookDescription[Welcome to $serverName, $username!]
$webhookSend[$welcomeHook;]
```

## Notes

- The defined avatar only applies to the **next** `$webhookSend`.
- For repeated sendings with the same avatar, include `$webhookAvatarURL[]` before each `$webhookSend[]`.
- The maximum image size is 8 MB.
