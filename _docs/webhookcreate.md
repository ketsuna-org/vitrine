---
layout: doc
title: $webhookCreate
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookCreate
syntax: $webhookCreate[channelID;name;(avatarURL)]
description: Creates a new webhook dans un canal spécifié and retourne son URL. The webhook created peut then être utilisé avec $webhookSend pour envoyer des messages.
---

# $webhookCreate

The function `$webhookCreate[]` allows **créer un new webhook** dans un canal Discord and retourne son URL complete.

## Syntax

```
$webhookCreate[channelID;name;(avatarURL)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal où créer le webhook. |
| `name` | The name du webhook (2 à 80 becauseactères). |
| `avatarURL` | Optional - URL of the image d'avatar du webhook. |

## Return Value

- **Type** : String (URL)
- The URL complete du webhook au format `https://discord.com/api/webhooks/ID/TOKEN`
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
  $webhookSend[$hook;Webhook de logs created successfully !]
$else
  $sendMessage[Échec : permission MANAGE_WEBHOOKS requirede.]
$endif
```

### Création avec stockage

```bdfd
$let[logHook;$webhookCreate[$channelID;Logs;$serverIcon]]
$setUserVar[logWebhook;$logHook]
$sendMessage[Webhook de logs configured !]
```

## Notes

- Les webhooks createds par the bot sont liés au bot.
- Un webhook ne peut pas être transféré à un autre canal after création.
- Supprimez les webhooks inutilisés avec `$webhookDelete[]`.
