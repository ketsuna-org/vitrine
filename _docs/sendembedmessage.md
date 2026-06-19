---
layout: doc
title: $sendEmbedMessage[]
translation_key: docs
category: "Embed & Message"
function_name: sendEmbedMessage
syntax: $sendEmbedMessage[(channelId);(messageId)]
description: Envoie un embed construit (via $title, $description, $addField, etc.) dans un canal spécifique. Optionnellement, peut éditer un message existant si un messageId est fourni.
---

# $sendEmbedMessage[] — Envoyer un Embed

`$sendEmbedMessage[]` envoie l'embed précédemment construit dans un canal Discord. C'est la méthode principale pour envoyer des messages riches (embeds) de manière ciblée, distincte de `$sendMessage[]`.

## Syntaxe

```
$sendEmbedMessage[(channelId);(messageId)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `channelId` | Non | Canal courant | ID du canal de destination. |
| `messageId` | Non | Nouveau message | ID d'un message à éditer. |

## Valeur de retour

- **Type** : `string`
- Retourne l'identifiant du message créé ou édité. Utilisable pour des opérations ultérieures.

## Utilisation

### Embed simple dans le canal courant

```bdfd
$title[État du serveur]
$description[Tout fonctionne normalement]
$color[#2ECC71]
$addField[Uptime;$uptime;yes]
$addField[Joueurs;$var[players];yes]
$sendEmbedMessage
```

### Embed dans un canal spécifique

```bdfd
$title[Nouveau membre]
$description[$username a rejoint le serveur !]
$addField[ID;$authorID;yes]
$thumbnail[$authorAvatar]
$color[#5865F2]
$sendEmbedMessage[$channelID[bienvenue]]
```

### Édition d'un embed existant

```bdfd
$title[Classement - Mis à jour]
$description[Classement actualisé]
$addField[1er;$var[top1];yes]
$addField[2ème;$var[top2];yes]
$addField[3ème;$var[top3];yes]
$color[#F1C40F]
$footer[Mis à jour à $time]
$sendEmbedMessage[$channelID[classement];$var[leaderboard_msg_id]]
```

### Capture de l'ID pour usage ultérieur

```bdfd
$title[Message éditable]
$description[Ce message sera mis à jour]
$var[msgId;$sendEmbedMessage]
$editEmbedIn[10s]
$title[Message éditable - Mis à jour]
$description[La mise à jour a été effectuée]
$color[#27AE60]
```

## Notes

- L'embed doit être construit **avant** l'appel à `$sendEmbedMessage[]` (avec `$title[]`, `$description[]`, `$addField[]`, etc.).
- Si aucun embed n'est défini, le message sera vide (comportement à éviter).
- La valeur de retour (message ID) est utile pour des éditions ou suppressions ultérieures.
- Pour envoyer à la fois du texte et un embed, utilisez `$sendMessage[]` qui peut combiner les deux.
