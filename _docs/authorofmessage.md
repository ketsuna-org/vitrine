---
layout: doc
title: $authorOfMessage
translation_key: docs
category: "Messages & DM"
function_name: authorOfMessage
syntax: $authorOfMessage[messageID]
description: Returns the ID de the author of a message spécifique, identifié par its ID.
---
# $authorOfMessage

The `$authorOfMessage[]` function returns the **ID de the author** of a message donné.

## Syntax

```
$authorOfMessage[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message cible. |

## Return value

- **Type** : Snowflake (string)
- The ID of the user auteur of the message.
- String vide if the message est introuvable.

## Examples

### Récupérer the author

```bdfd
$let[author;$authorOfMessage[$message[1]]]
$sendMessage[This message has been sent par <@$author>]
```

### Vérifier le owner of a message

```bdfd
$if[$authorOfMessage[$messageID]==$authorID]
  $sendMessage[This message vous appartient.]
$else
  $sendMessage[This message ne vous appartient pas.]
$endif
```

### Log de suppression

```bdfd
$let[msgID;$message[1]]
$let[author;$authorOfMessage[$msgID]]
$channelSendMessage[123456789;Message $msgID deleted — Auteur : <@$author>]
```

### Command info message

```bdfd
$let[msgID;$message[1]]
$let[author;$authorOfMessage[$msgID]]
$title[📋 Info Message]
$description[
**ID** : $msgID
**Auteur** : <@$author> ($author)
**Contenu** : $getMessage[$msgID]
]
$sendMessage[]
```

## Notes

- The bot must have accès au canal contenant the message.
- Les messages en DM can be consultés if the bot y a accès.
- For the message courant, `$authorID` est plus direct.
