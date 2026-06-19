---
layout: doc
title: $webhookSend
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookSend
syntax: $webhookSend[webhookURL;content]
description: Sends a message via un webhook Discord. Allows to envoyer du contenu formatted, embeds and des files vers un canal external or internal via une URL de webhook.
---

# $webhookSend

The function `$webhookSend[]` allows to **envoyer un message via un webhook** Discord. C'est le point d'entrée principal pour utiliser les webhooks avec BDFD.

## Syntax

```
$webhookSend[webhookURL;content]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookURL` | The URL complete du webhook Discord (`https://discord.com/api/webhooks/ID/TOKEN`). |
| `content` | Le text content of the message à envoyer. Supporte le markdown and les emojis. |

## Return Value

This function ne retourne pas de value directly. The message est sent via l'API de webhook Discord.

## Behavior

- Si le webhook est invalid or expiré, l'envoi échoue silencieusement.
- Le contenu peut inclure des sauts de ligne, du markdown and des mentions.
- Les functions d'embed webhook (`$webhookTitle`, `$webhookDescription`, etc.) must be placées **before** `$webhookSend[]` in the code.
- `$webhookSend[]` must be la **last** function webhook callée, because elle déclenche l'envoi.

## Examples

### Envoi simple

```bdfd
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;Hello World !]
```

### Envoi avec embed

```bdfd
$webhookTitle[Titre of the embed]
$webhookDescription[Description détaillée ici]
$webhookColor[#5865F2]
$webhookFooter[Pied de page]
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

- Les URLs de webhook sont sensibles : ne les exposez never dans du code public.
- Stockez les URLs de webhook dans des variables d'environnement or des constantes.
- Un webhook peut envoyer until 10 embeds par message.
- La limit de becauseactères par message est de 2000 for the contenu text.
