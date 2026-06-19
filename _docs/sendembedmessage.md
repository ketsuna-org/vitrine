---
layout: doc
title: $sendEmbedMessage[]
translation_key: docs
category: "Embed & Message"
function_name: sendEmbedMessage
syntax: $sendEmbedMessage[(channelId);(messageId)]
description: Sends a embed construit (via $title, $description, $addField, etc.) dans un canal spécifique. Optionallement, peut éditer un message existing if a messageId est fourni.
---

# $sendEmbedMessage[] — Envoyer un Embed

`$sendEmbedMessage[]` sends the embed previously construit dans un canal Discord. C'est la méthode main pour envoyer des messages riches (embeds) de manière ciblée, distincte de `$sendMessage[]`.

## Syntax

```
$sendEmbedMessage[(channelId);(messageId)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `channelId` | No | Canal courant | ID of the canal de destination. |
| `messageId` | No | New message | ID of a message à éditer. |

## Return Value

- **Type** : `string`
- Returns the identifier of the message created or édité. Utilisable pour des opérations ultérieures.

## Utilisation

### Embed simple in the canal courant

```bdfd
$title[State of the server]
$description[Tout functionne normalement]
$color[#2ECC71]
$addField[Uptime;$uptime;yes]
$addField[Joueurs;$var[players];yes]
$sendEmbedMessage
```

### Embed dans un canal spécifique

```bdfd
$title[New member]
$description[$username a rejoint the server !]
$addField[ID;$authorID;yes]
$thumbnail[$authorAvatar]
$color[#5865F2]
$sendEmbedMessage[$channelID[bienvenue]]
```

### Édition of an embed existing

```bdfd
$title[Classement - Mis à day]
$description[Classement actualisé]
$addField[1er;$var[top1];yes]
$addField[2ème;$var[top2];yes]
$addField[3ème;$var[top3];yes]
$color[#F1C40F]
$footer[Mis à day à $time]
$sendEmbedMessage[$channelID[classement];$var[leaderboard_msg_id]]
```

### Capture de the ID pour usage ultérieur

```bdfd
$title[Message éditable]
$description[This message sera mis à day]
$var[msgId;$sendEmbedMessage]
$editEmbedIn[10s]
$title[Message éditable - Mis à day]
$description[La mise à day was effectuée]
$color[#27AE60]
```

## Notes

- The embed must be construit **before** l'call à `$sendEmbedMessage[]` (avec `$title[]`, `$description[]`, `$addField[]`, etc.).
- Si no embed n'est défini, the message sera vide (comportement à éviter).
- The value de retour (message ID) est utile pour des éditions or suppressions ultérieures.
- Pour envoyer à la fois du text and un embed, utilisez `$sendMessage[]` qui peut combiner les two.
