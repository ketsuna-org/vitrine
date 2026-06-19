---
layout: doc
title: $messageID
translation_key: docs
category: "Entity Info"
function_name: messageID
syntax: $messageID
description: Returns the ID (snowflake) of the message déclencheur of the command.
---

# $messageID

The function `$messageID` retourne l'**identifier unique** (snowflake) of the message qui a déclenché l'exécution of the command.

## Syntax

```
$messageID
```

## Parameters

Aucun parameter.

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the message déclencheur. |

## Examples

### Afficher the ID of the message

```bdfd
$sendMessage[ID of the message : $messageID]
```

### Link direct vers the message

```bdfd
$sendMessage[Link of the message : https://discord.com/channels/$guildID/$channelID/$messageID]
```

### Log de the ID

```bdfd
$channelSendMessage[$channelIDFromName[logs];Message $messageID traité par $username.]
```

### Supprimer the message after traitement

```bdfd
$deleteMessage[$channelID;$messageID]
$sendMessage[Message traité and deleted.]
```

## Notes

- The ID est unique and allows to identifier précisément un message.
- Utilisable avec `$deleteMessage`, `$editMessage` or `$messageURL`.
- Dans les interactions (buttons), `$messageID` retourne the ID of the message d'origine.
