---
layout: doc
title: $webhookTitle
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookTitle
syntax: $webhookTitle[text]
description: Sets the titre of the embed for the prochain message sent via $webhookSend.
---

# $webhookTitle

The function `$webhookTitle[]` allows **define the titre** of the embed for the prochain message webhook.

## Syntax

```
$webhookTitle[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le titre of the embed. Maximum 256 becauseactères. Supports thes emojis and les variables. |

## Return Value

This function ne retourne pas of value. Elle définit le titre of the prochain embed.

## Behavior

- Le titre apparaît en haut of the embed, en text plus grand and en gras.
- Si no titre n'est défini mais qu'une description l'est, the embed sera created without titre.
- Le titre est réinitialisé after each `$webhookSend[]`.

## Examples

### Titre dynamic

```bdfd
$webhookTitle[🔨 Action of modération]
$webhookDescription[
**Action :** $message[1]
**User :** $userName[$mentioned[1]]
**Reason :** $noMentionMessage
]
$webhookColor[#ED4245]
$webhookFooter[Modération • $username]
$webhookSend[$modHook;]
```

### Titre with emoji

```bdfd
$webhookTitle[✅ Tâche terminée]
$webhookDescription[La sauvegarde automatique datas was effectuée with success.]
$webhookColor[#57F287]
$webhookSend[$webhookURL;]
```

### Embeds multiple (conceptuel)

```bdfd
$webhookTitle[Premier embed]
$webhookDescription[Content of the first embed.]
$webhookSend[$webhookURL;]

$webhookTitle[Second embed]
$webhookDescription[Content of the second embed.]
$webhookColor[#FEE75C]
$webhookSend[$webhookURL;]
```

## Notes

- Maximum 256 becauseactères for the titre.
- Le titre est en gras and plus grand que la description.
- Un embed peut exister without titre (description only), mais un titre seul (without description) functionne also.
