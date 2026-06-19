---
layout: doc
title: $webhookContent
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookContent
syntax: $webhookContent[text]
description: Sets the text content of the prochain message sent via $webhookSend. Alternative to the second parameter of $webhookSend.
---

# $webhookContent

The function `$webhookContent[]` allows **define the text content** of a message webhook, like alternative to the second parameter of `$webhookSend[]`.

## Syntax

```
$webhookContent[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text of the message. Supports the markdown, les emojis and les mentions. Maximum 2000 becauseactères. |

## Return Value

This function ne retourne pas of value. Elle définit le contenu for the prochain `$webhookSend[]`.

## Behavior

- Le contenu défini remplace le second parameter of `$webhookSend[]`.
- Supports tout le formatage markdown Discord.
- Si `$webhookContent[]` and `$webhookSend[url;text]` sont all two utilisés, le contenu of `$webhookContent[]` est prioritaire.

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
$webhookContent[📢 **New annonce** of $username !
>>> $message]
$webhookSend[$webhookURL;]
```

### Avec embed and contenu

```bdfd
$webhookContent[Voici les détails ci-dessous :]
$webhookTitle[Détails importants]
$webhookDescription[Les information détaillées se trouvent ici.]
$webhookColor[#FEE75C]
$webhookSend[$webhookURL;]
```

## Notes

- La limit est of 2000 becauseactères for the contenu text.
- Le contenu text apparaît au-dessus of the embed s'il y en a un.
- Utilisez `>>> ` pour create a bloc of citation in the contenu.
