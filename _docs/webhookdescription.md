---
layout: doc
title: $webhookDescription
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookDescription
syntax: $webhookDescription[text]
description: Sets the description (corps) of the embed for the prochain message sent via $webhookSend.
---

# $webhookDescription

The function `$webhookDescription[]` allows **define the description** (corps principal) of the embed for the prochain message webhook.

## Syntax

```
$webhookDescription[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le contenu of la description of the embed. Supports markdown, mentions, emojis. Max 4096 becauseactères. |

## Return Value

This function ne retourne pas of value. Elle définit la description of the prochain embed.

## Behavior

- La description apparaît sous le titre of the embed.
- Supports the markdown complete : gras, italique, links, lists, code, etc.
- Les sauts of ligne sont préservés.
- La description est réinitialisée after each `$webhookSend[]`.

## Examples

### Description simple

```bdfd
$webhookTitle[Statistiques of the server]
$webhookDescription[
**Members :** $membersCount
**Online :** $onlineMembers
**Bots :** $botCount
**Boost :** Level $boostLevel
]
$webhookColor[#5865F2]
$webhookSend[$webhookURL;]
```

### Description with formatage

```bdfd
$webhookTitle[Rapport of modération]
$webhookDescription[
**Modérateur :** $username
**Action :** Ban
**User :** $userName[$mentioned[1]]
**Reason :** $message[2]

*Action effectuée le $date[$day]/$date[$month]/$date[$year]*
]
$webhookColor[#ED4245]
$webhookSend[$logHook;]
```

### Description conditionnelle

```bdfd
$if[$checkContains[$message;!report]==true]
  $webhookTitle[New signalement]
  $webhookDescription[
  **Signalé par :** $username
  **User signalé :** $userName[$mentioned[1]]
  **Reason :** $noMentionMessage
  ]
  $webhookColor[#FEE75C]
  $webhookSend[$reportHook;]
$endif
```

## Notes

- Maximum 4096 becauseactères for the description.
- La description est le corps principal of the embed.
- Combinez titre + description + couleur for a embed visuallement complete.
