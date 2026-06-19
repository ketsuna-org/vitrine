---
layout: doc
title: $getMessage
translation_key: docs
category: "Moderation"
function_name: getMessage
syntax: $getMessage[channelID;messageID]
description: Gets the text content of a message spécifique par son ID de canal and de message.
---

# $getMessage

The function `$getMessage[]` allows **récupérer le text content** of a message from son ID de canal and de message.

## Syntax

```
$getMessage[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal contenant the message. |
| `messageID` | The ID of the message à récupérer. |

## Return Value

- **Type** : String
- Le text content of the message.
- String vide si the message n'existe pas, was deleted, or est inaccessible.

## Behavior

- Returns aiquement le contenu text (pas les embeds, pièces jointes, etc.).
- The bot doit avoir accès au canal and la permission `READ_MESSAGE_HISTORY`.
- The message doit avoir moins de 14 days (limitation API Discord for the messages non épinglés).

## Examples

### Citer un message

```bdfd
$let[msgContent;$getMessage[$channelID;$noMentionMessage]]
$if[$msgContent!=]
  $title[Message cité]
  $description[>>> $msgContent]
  $footer[Message ID : $noMentionMessage]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Message introuvable.]
$endif
```

### Log de message deleted

```bdfd
$let[msgContent;$getMessage[$channelID;$messageID]]
$if[$msgContent!=]
  $title[🗑️ Message récupéré]
  $description[
  **Auteur :** $username
  **Contenu :**
>>> $msgContent
  ]
  $color[#ED4245]
  $channelSendMessage[$logChannel;]
$endif
```

### Vérification de contenu

```bdfd
$let[target;$getMessage[$channelID;$message[1]]]
$if[$checkContains[$target;http]==true]
  $sendMessage[⚠️ This message contains un link.]
$else
  $sendMessage[✅ Aucun link détecté.]
$endif
```

## Notes

- Limité aux 14 lasts days for the messages non épinglés (restriction API Discord).
- Ne récupère pas les embeds, only le text brut.
- Utile for the systèmes de citation, logs and modération.
