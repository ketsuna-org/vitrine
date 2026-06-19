---
layout: doc
title: $createChannel
translation_key: docs
category: "Moderation"
function_name: createChannel
syntax: $createChannel[name;(type);(categoryID);(topic);(nsfw);(slowmode)]
description: Creates a new canal on the server. Supporte les canaux text, vocaux, de catégorie, d'annonce and de scène.
---

# $createChannel

The `$createChannel[]` function **créer un new canal** on the server Discord.

## Syntax

```
$createChannel[name;(type);(categoryID);(topic);(nsfw);(slowmode)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the canal (1 à 100 becauseactères). |
| `type` | Optional - Type : `0`=text, `2`=vocal, `4`=catégorie, `5`=annonce, `13`=scène. Default: `0`. |
| `categoryID` | Optional - ID of the catégorie parente. |
| `topic` | Optional - Sujet/description du canal (max 1024). |
| `nsfw` | Optional - `true`/`false` for the marquage NSFW. |
| `slowmode` | Optional - Delay en seconds (0-21600). |

## Return value

- **Type** : Snowflake (string)
- The ID of the canal created.
- String vide si échec (permissions insuffisantes).

## Behavior

- The bot must have the permission `MANAGE_CHANNELS`.
- Les canaux d'annonce (type 5) nécessitent a server communautaire.
- Les canaux de scène (type 13) sont des canaux vocaux special.

## Examples

### Canal de logs

```bdfd
$let[logChan;$createChannel[logs-bot;0;123456789;;false;0]]
$if[$logChan!=]
  $channelSendMessage[$logChan;Système de logs enabled.]
  $sendMessage[Canal de logs created : <#$logChan>]
$else
  $sendMessage[Error : permission MANAGE_CHANNELS requirede.]
$endif
```

### Canal de ticket dynamic

```bdfd
$let[ticketChan;$createChannel[ticket-$username;0;123456789;Ticket de $username;false;0]]
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

- Les noms de canaux sont converteds en minuscules and les espaces replaceds par des tirets.
- Maximum 500 canaux par server.
- Pour supprimer, use `$deleteChannels[]`.
