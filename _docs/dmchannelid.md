---
layout: doc
title: $dmChannelID
translation_key: docs
category: "Messages & DM"
function_name: dmChannelID
syntax: $dmChannelID[userID]
description: Retrieves the ID of the canal DM (conversation privatee) between the bot and a user. Crée le canal DM automatically s'il does not exist encore.
---
# $dmChannelID

The `$dmChannelID[]` function returns the **ID of the canal DM** (conversation privatee) between the bot and a user donné.

## Syntax

```
$dmChannelID[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user dont on veut le canal DM. |

## Return value

- **Type** : Snowflake (string)
- The ID of the canal DM.
- Crée automatically le DM if necessary.

## Behavior

- Crée le canal DM if the conversation does not exist encore.
- Utile pour combiner avec `$useChannel[]` or `$channelSendMessage[]`.
- N'échoue pas if the user a fermé their DMs (le canal is created, mais l'envoi peut échouer).

## Examples

### Récupérer the ID DM

```bdfd
$let[dmChannel;$dmChannelID[$authorID]]
$sendMessage[Votre conversation privatee with the bot : $dmChannel]
```

### Envoyer in the DM via useChannel

```bdfd
$useChannel[$dmChannelID[$authorID]]
$sendMessage[This message is sent en private.]
```

### Logging de canal DM

```bdfd
$log[DM ouvert avec <@$authorID> - Canal : $dmChannelID[$authorID]]
```

## Notes

- Le canal DM est persistant once created par Discord.
- Pour envoyer a message private, `$dm[]` est plus simple.
- Use `$dmChannelID[]` when vous avez besoin de the ID pour d'autres opérations.
