---
layout: doc
title: $webhookAvatarURL
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookAvatarURL
syntax: $webhookAvatarURL[url]
description: Sets the URL of the avatar for the prochain message sent via $webhookSend. Doit être placé before l'call to $webhookSend.
---

# $webhookAvatarURL

The function `$webhookAvatarURL[]` allows **define l'avatar** qui sera utilisé lors of the prochain envoi via `$webhookSend[]`.

## Syntax

```
$webhookAvatarURL[url]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | The URL of the image to use like avatar. Formats supportés : PNG, JPG, GIF, WEBP. |

## Return Value

This function ne retourne pas of value. Elle définit l'avatar for the prochain call to `$webhookSend[]` only.

## Behavior

- The URL must be accessible publicment.
- L'image est téléloadede par Discord at the time of l'envoi.
- L'avatar est réinitialisé after each `$webhookSend[]`.
- Si the URL est invalid, l'avatar default of the webhook is used.

## Examples

### Avatar custom

```bdfd
$webhookAvatarURL[https://cdn.example.com/avatars/notif.png]
$webhookUsername[Système]
$webhookContent[New notification !]
$webhookSend[$webhookURL;]
```

### Avatar dynamic

```bdfd
$webhookAvatarURL[$authorAvatar]
$webhookUsername[$username]
$webhookContent[$message]
$webhookSend[$webhookURL;]
```

### Avatar of server

```bdfd
$webhookAvatarURL[$serverIcon]
$webhookUsername[$serverName]
$webhookTitle[Bienvenue !]
$webhookDescription[Bienvenue on $serverName, $username !]
$webhookSend[$welcomeHook;]
```

## Notes

- L'avatar défini ne s'applique qu'au **prochain** `$webhookSend[]`.
- Pour envois répétés with the même avatar, incluez `$webhookAvatarURL[]` before each `$webhookSend[]`.
- The size maximale of l'image est of 8 Mo.
