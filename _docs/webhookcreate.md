---
layout: doc
title: $webhookCreate
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookCreate
syntax: $webhookCreate[channelID;name;(avatarURL)]
description: Creates a new webhook in a canal spécifié and retourne son URL. The webhook created peut then être utilisé with $webhookSend pour envoyer messages.
---

# $webhookCreate

The function `$webhookCreate[]` allows **create a new webhook** in a canal Discord and retourne son URL complete.

## Syntax

```
$webhookCreate[channelID;name;(avatarURL)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal où create the webhook. |
| `name` | The name of the webhook (2 to 80 becauseactères). |
| `avatarURL` | Optional - URL of the image of avatar of the webhook. |

## Return Value

- **Type** : String (URL)
- The URL complete of the webhook to the format `https://discord.com/api/webhooks/ID/TOKEN`
- String vide or error si the bot n'a pas la permission `MANAGE_WEBHOOKS`.

## Behavior

- Requires the permission `MANAGE_WEBHOOKS` in the canal cible.
- The name doit faire between 2 and 80 becauseactères.
- L'avatar must be une URL valid pointant vers une image (PNG, JPG, GIF, WEBP).
- Un canal peut avoir until 10 webhooks (server) or 100 (communauté).

## Examples

### Création simple

```bdfd
$let[hook;$webhookCreate[$channelID;Logger of the server]]
$if[$hook!=]
  $webhookSend[$hook;Webhook of logs created successfully !]
$else
  $sendMessage[Échec : permission MANAGE_WEBHOOKS requirede.]
$endif
```

### Création with stockage

```bdfd
$let[logHook;$webhookCreate[$channelID;Logs;$serverIcon]]
$setUserVar[logWebhook;$logHook]
$sendMessage[Webhook of logs configured !]
```

## Notes

- Les webhooks createds par the bot sont liés to the bot.
- Un webhook ne peut pas être transféré to un autre canal after création.
- Supprimez les webhooks inutilisés with `$webhookDelete[]`.
