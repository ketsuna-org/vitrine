---
layout: doc
title: $webhookUsername
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookUsername
syntax: $webhookUsername[name]
description: Sets the nom d'user displayed for the prochain message sent via $webhookSend.
---

# $webhookUsername

The function `$webhookUsername[]` allows **définir the name d'user** qui sera displayed for the prochain message sent via `$webhookSend[]`.

## Syntax

```
$webhookUsername[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name à afficher. Maximum 80 becauseactères. Supporte les emojis and variables. |

## Return Value

This function ne retourne pas de value. Elle définit the name for the prochain `$webhookSend[]`.

## Behavior

- The name remplace the name default du webhook pour cet envoi.
- The name est réinitialisé after each `$webhookSend[]`.
- Si no nom n'est défini, the name original du webhook is used.

## Examples

### Nom fixe

```bdfd
$webhookUsername[📢 Annonces of the server]
$webhookContent[New mise à day available !]
$webhookSend[$webhookURL;]
```

### Nom dynamic

```bdfd
$webhookUsername[$username (via webhook)]
$webhookAvatarURL[$authorAvatar]
$webhookContent[$message]
$webhookSend[$webhookURL;]
```

### Anonymisation

```bdfd
$webhookUsername[Message anonyme]
$webhookAvatarURL[https://cdn.example.com/anonymous.png]
$webhookContent[$noMentionMessage]
$webhookSend[$confessionHook;]
```

## Notes

- The name ne peut pas dépasser 80 becauseactères.
- Les webhooks avec des noms usurpant des roles officiels (Admin, Modérateur) can be trompeurs — utilisez-les de manière éthique.
- Combinez avec `$webhookAvatarURL[]` for ae personnalisation complete.
