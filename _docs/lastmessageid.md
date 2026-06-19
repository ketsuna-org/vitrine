---
layout: doc
title: $lastMessageID
translation_key: docs
category: "Entity Info"
function_name: lastMessageID
syntax: $lastMessageID[(channelID)]
description: Returns the ID of the last message sent in the channel courant or dans un channel spécifié.
---

# $lastMessageID

The function `$lastMessageID` retourne l'**ID of the last message** sent dans un channel Discord. Par default, elle cible the channel courant.

## Syntax

```
$lastMessageID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. Si omis, the channel courant is used. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the last message of the channel. |

## Examples

### Dernier message of the channel courant

```bdfd
$sendMessage[Dernier message dans ce channel : $lastMessageID]
```

### Dernier message of a channel spécifique

```bdfd
$sendMessage[Activité dans #annonces : last message $lastMessageID[123456789012345678]]
```

### Vérifier l'activité récente

```bdfd
$if[$lastMessageID==$messageID]
  $sendMessage[Votre message est le last of the channel !]
$endif
```

### Link du last message

```bdfd
$sendMessage[Dernier message : https://discord.com/channels/$guildID/$channelID/$lastMessageID]
```

## Notes

- Si the channel est vide (no message), le comportement peut varier.
- Utile pour surveiller l'activité or lier le last message.
- The bot doit avoir accès au channel pour obtenir cette information.
