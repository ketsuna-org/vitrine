---
layout: doc
title: $lastMessageID
translation_key: docs
category: "Entity Info"
function_name: lastMessageID
syntax: $lastMessageID[(channelID)]
description: Returns the ID of the last message sent in the channel courant or in a channel spécifié.
---

# $lastMessageID

The function `$lastMessageID` retourne l'**ID of the last message** sent in a channel Discord. Par default, elle target the channel courant.

## Syntax

```
$lastMessageID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. Si omitted, the channel courant is used. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the last message of the channel. |

## Examples

### Last message of the channel courant

```bdfd
$sendMessage[Last message in ce channel : $lastMessageID]
```

### Last message of a channel specific

```bdfd
$sendMessage[Activité in #annonces : last message $lastMessageID[123456789012345678]]
```

### Vérifier l'activité récente

```bdfd
$if[$lastMessageID==$messageID]
  $sendMessage[Votre message est le last of the channel !]
$endif
```

### Link of the last message

```bdfd
$sendMessage[Last message : https://discord.com/channels/$guildID/$channelID/$lastMessageID]
```

## Notes

- Si the channel est vide (no message), le comportement peut varier.
- Utile pour surveiller l'activité or lier le last message.
- The bot doit avoir accès to the channel pour obtenir cette information.
