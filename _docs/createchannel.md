---
layout: doc
title: $createChannel
translation_key: docs
category: "Moderation"
function_name: createChannel
syntax: $createChannel[name;(type);(categoryID);(topic);(nsfw);(slowmode)]
description: Creates a new canal on the server. Supports thes canaux text, vocaux, of catégorie, of annonce and of scène.
---

# $createChannel

The `$createChannel[]` function **create a new canal** on the server Discord.

## Syntax

```
$createChannel[name;(type);(categoryID);(topic);(nsfw);(slowmode)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the canal (1 to 100 becauseactères). |
| `type` | Optional - Type : `0`=text, `2`=vocal, `4`=catégorie, `5`=annonce, `13`=scène. Default: `0`. |
| `categoryID` | Optional - ID of the catégorie parente. |
| `topic` | Optional - Sujet/description of the canal (max 1024). |
| `nsfw` | Optional - `true`/`false` for the marquage NSFW. |
| `slowmode` | Optional - Delay en seconds (0-21600). |

## Return value

- **Type** : Snowflake (string)
- The ID of the canal created.
- String vide si échec (permissions insuffisantes).

## Behavior

- The bot must have the permission `MANAGE_CHANNELS`.
- Les canaux of annonce (type 5) nécessitent a server communautaire.
- Les canaux of scène (type 13) sont canaux vocaux special.

## Examples

### Canal of logs

```bdfd
$let[logChan;$createChannel[logs-bot;0;123456789;;false;0]]
$if[$logChan!=]
  $channelSendMessage[$logChan;Système of logs enabled.]
  $sendMessage[Canal of logs created : <#$logChan>]
$else
  $sendMessage[Error : permission MANAGE_CHANNELS requirede.]
$endif
```

### Canal of ticket dynamic

```bdfd
$let[ticketChan;$createChannel[ticket-$username;0;123456789;Ticket of $username;false;0]]
$if[$ticketChan!=]
  $channelSendMessage[$ticketChan;Bienvenue $username ! Décrivez votre problème.]
  $sendMessage[Ticket created : <#$ticketChan>]
$endif
```

### Catégorie + canaux

```bdfd
$let[cat;$createChannel[New Projet;4;0]]
$let[chat;$createChannel[discussion;0;$cat]]
$let[vocal;$createChannel[Vocal;2;$cat]]
$sendMessage[Catégorie and canaux createds !]
```

## Notes

- Les noms of canaux sont converteds en minuscules and les espaces replaceds par tirets.
- Maximum 500 canaux par server.
- Pour supprimer, use `$deleteChannels[]`.
