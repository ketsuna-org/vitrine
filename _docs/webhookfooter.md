---
layout: doc
title: $webhookFooter
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookFooter
syntax: $webhookFooter[text]
description: Sets the text du pied de page (footer) of the embed for the prochain message sent via $webhookSend.
---

# $webhookFooter

The function `$webhookFooter[]` allows **définir le pied de page** (footer) of the embed for the prochain message webhook.

## Syntax

```
$webhookFooter[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text du footer. Maximum 2048 becauseactères. Supporte les variables BDFD. |

## Return Value

This function ne retourne pas de value. Elle définit le footer du prochain embed.

## Behavior

- Le footer apparaît en bas of the embed, en text plus petit and grisé.
- Idéal for the informations de timestamp, signature or source.
- Le footer est réinitialisé after each `$webhookSend[]`.

## Examples

### Footer informatif

```bdfd
$webhookTitle[Log de command]
$webhookDescription[
**Command :** $commandName
**User :** $username ($authorID)
**Canal :** $channelName
]
$webhookFooter[Logger • $date[$day]/$date[$month]/$date[$year] à $date[$hour]:$date[$minute]]
$webhookColor[#5865F2]
$webhookSend[$logHook;]
```

### Footer de signature

```bdfd
$webhookTitle[Bienvenue !]
$webhookDescription[Bienvenue sur **$serverName**, $username ! Nous sommes now $membersCount members !]
$webhookFooter[Merci de lire le règlement dans $channelName[$rulesChannelID]]
$webhookColor[#57F287]
$webhookSend[$welcomeHook;]
```

## Notes

- Le footer est displayed en text plus petit and de couleur grise par Discord.
- Maximum 2048 becauseactères.
- Contrairement au titre and à la description, le footer ne supporte pas le markdown.
