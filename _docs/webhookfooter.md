---
layout: doc
title: $webhookFooter
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookFooter
syntax: $webhookFooter[text]
description: Sets the text of the pied of page (footer) of the embed for the prochain message sent via $webhookSend.
---

# $webhookFooter

The function `$webhookFooter[]` allows **define the pied of page** (footer) of the embed for the prochain message webhook.

## Syntax

```
$webhookFooter[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text of the footer. Maximum 2048 becauseactères. Supports thes variables BDFD. |

## Return Value

This function ne retourne pas of value. Elle définit le footer of the prochain embed.

## Behavior

- Le footer apparaît en bas of the embed, en text plus petit and grisé.
- Idéal for the information of timestamp, signature or source.
- Le footer est réinitialisé after each `$webhookSend[]`.

## Examples

### Footer informatif

```bdfd
$webhookTitle[Log of command]
$webhookDescription[
**Command :** $commandName
**User :** $username ($authorID)
**Canal :** $channelName
]
$webhookFooter[Logger • $date[$day]/$date[$month]/$date[$year] to $date[$hour]:$date[$minute]]
$webhookColor[#5865F2]
$webhookSend[$logHook;]
```

### Footer of signature

```bdfd
$webhookTitle[Bienvenue !]
$webhookDescription[Bienvenue on **$serverName**, $username ! Nous sommes now $membersCount members !]
$webhookFooter[Merci of lire le règlement in $channelName[$rulesChannelID]]
$webhookColor[#57F287]
$webhookSend[$welcomeHook;]
```

## Notes

- Le footer est displayed en text plus petit and of couleur grise par Discord.
- Maximum 2048 becauseactères.
- Contrairement to the titre and to la description, le footer ne supporte pas le markdown.
