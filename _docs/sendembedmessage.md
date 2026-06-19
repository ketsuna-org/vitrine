---
layout: doc
title: $sendEmbedMessage[]
translation_key: docs
category: "Embed & Message"
function_name: sendEmbedMessage
syntax: $sendEmbedMessage[(channelId);(messageId)]
description: Sends a embed construit (via $title, $description, $addField, etc.) in a canal specific. Optionallement, peut éditer un message existing if a messageId est fourni.
---

# $sendEmbedMessage[] — Envoyer un Embed

`$sendEmbedMessage[]` sends the embed previously construit in a canal Discord. C'est la méthode main pour envoyer messages riches (embeds) of manière ciblée, distincte of `$sendMessage[]`.

## Syntax

```
$sendEmbedMessage[(channelId);(messageId)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `channelId` | No | Canal courant | ID of the canal of destination. |
| `messageId` | No | New message | ID of a message to éditer. |

## Return Value

- **Type** : `string`
- Returns the identifier of the message created or édité. Utilisable pour opérations ultérieures.

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

### Embed in a canal specific

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
$title[Classement - Mis to day]
$description[Classement actualisé]
$addField[1er;$var[top1];yes]
$addField[2ème;$var[top2];yes]
$addField[3ème;$var[top3];yes]
$color[#F1C40F]
$footer[Mis to day to $time]
$sendEmbedMessage[$channelID[classement];$var[leaderboard_msg_id]]
```

### Capture of the ID pour usage ultérieur

```bdfd
$title[Message éditable]
$description[This message sera mis to day]
$var[msgId;$sendEmbedMessage]
$editEmbedIn[10s]
$title[Message éditable - Mis to day]
$description[La mise to day was effectuée]
$color[#27AE60]
```

## Notes

- The embed must be construit **before** l'call to `$sendEmbedMessage[]` (avec `$title[]`, `$description[]`, `$addField[]`, etc.).
- Si no embed n'est défini, the message sera vide (comportement to éviter).
- The value of retour (message ID) est utile pour éditions or suppressions ultérieures.
- Pour envoyer to la fois of the text and un embed, utilisez `$sendMessage[]` qui peut combiner les two.
