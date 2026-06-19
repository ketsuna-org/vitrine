---
layout: doc
title: $webhookContent
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookContent
syntax: $webhookContent[text]
description: Sets the text content du prochain message sent via $webhookSend. Alternative au second parameter de $webhookSend.
---

# $webhookContent

The function `$webhookContent[]` allows **définir le text content** of a message webhook, comme alternative au second parameter de `$webhookSend[]`.

## Syntax

```
$webhookContent[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text of the message. Supporte le markdown, les emojis and les mentions. Maximum 2000 becauseactères. |

## Return Value

This function ne retourne pas de value. Elle définit le contenu for the prochain `$webhookSend[]`.

## Behavior

- Le contenu défini remplace le second parameter de `$webhookSend[]`.
- Supporte tout le formatage markdown Discord.
- Si `$webhookContent[]` and `$webhookSend[url;text]` sont all two utilisés, le contenu de `$webhookContent[]` est prioritaire.

## Examples

### Contenu simple

```bdfd
$webhookContent[Ceci est un message sent via webhook !]
$webhookSend[$webhookURL;]
```

### Contenu formatted

```bdfd
$webhookUsername[Annonces]
$webhookAvatarURL[$serverIcon]
$webhookContent[📢 **New annonce** de $username !
>>> $message]
$webhookSend[$webhookURL;]
```

### Avec embed and contenu

```bdfd
$webhookContent[Voici les détails ci-dessous :]
$webhookTitle[Détails importants]
$webhookDescription[Les informations détaillées se trouvent ici.]
$webhookColor[#FEE75C]
$webhookSend[$webhookURL;]
```

## Notes

- La limit est de 2000 becauseactères for the contenu text.
- Le contenu text apparaît au-dessus of the embed s'il y en a un.
- Utilisez `>>> ` pour créer un bloc de citation in the contenu.
