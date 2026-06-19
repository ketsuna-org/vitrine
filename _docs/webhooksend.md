---
layout: doc
title: $webhookSend
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookSend
syntax: $webhookSend[webhookURL;content]
description: Sends a message via un webhook Discord. Allows to envoyer of the contenu formatted, embeds and files vers un canal external or internal via une URL of webhook.
---

# $webhookSend

The function `$webhookSend[]` allows to **envoyer un message via un webhook** Discord. C'est le point of entrée principal pour use thes webhooks with BDFD.

## Syntax

```
$webhookSend[webhookURL;content]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | The URL complete of the webhook Discord (`https://discord.com/api/webhooks/ID/TOKEN`). |
| `content` | Le text content of the message to envoyer. Supports the markdown and les emojis. |

## Return Value

This function ne retourne pas of value directly. The message est sent via l'API of webhook Discord.

## Behavior

- Si le webhook est invalid or expiré, l'envoi échoue silencieusement.
- Le contenu peut inclure sauts of ligne, of the markdown and mentions.
- Les functions of embed webhook (`$webhookTitle`, `$webhookDescription`, etc.) must be placées **before** `$webhookSend[]` in the code.
- `$webhookSend[]` must be la **last** function webhook callée, because elle déclenche l'envoi.

## Examples

### Envoi simple

```bdfd
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;Hello World !]
```

### Envoi with embed

```bdfd
$webhookTitle[Titre of the embed]
$webhookDescription[Description détaillée ici]
$webhookColor[#5865F2]
$webhookFooter[Pied of page]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;]
```

### Envoi conditionnel

```bdfd
$if[$checkContains[$message;!annonce]==true]
  $webhookTitle[New annonce]
  $webhookDescription[$message]
  $webhookSend[$webhookURL;]
$endif
```

## Notes

- Les URLs of webhook sont sensibles : ne les exposez never in of the code public.
- Stockez les URLs of webhook in variables of environnement or constantes.
- Un webhook peut envoyer until 10 embeds par message.
- La limit of becauseactères par message est of 2000 for the contenu text.
