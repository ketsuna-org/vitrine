---
layout: doc
title: $getMessage
translation_key: docs
category: "Moderation"
function_name: getMessage
syntax: $getMessage[channelID;messageID]
description: Gets the text content of a message specific par son ID of canal and of message.
---

# $getMessage

The function `$getMessage[]` allows **récupérer le text content** of a message from son ID of canal and of message.

## Syntax

```
$getMessage[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal contenant the message. |
| `messageID` | The ID of the message to récupérer. |

## Return Value

- **Type** : String
- Le text content of the message.
- String vide si the message n'existe pas, was deleted, or est inaccessible.

## Behavior

- Returns aiquement le contenu text (pas les embeds, pièces jointes, etc.).
- The bot doit avoir accès to the canal and la permission `READ_MESSAGE_HISTORY`.
- The message doit avoir moins of 14 days (limitation API Discord for the messages non épinglés).

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

### Log of message deleted

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

### Vérification of contenu

```bdfd
$let[target;$getMessage[$channelID;$message[1]]]
$if[$checkContains[$target;http]==true]
  $sendMessage[⚠️ This message contains un link.]
$else
  $sendMessage[✅ Aucun link détecté.]
$endif
```

## Notes

- Limité to the 14 lasts days for the messages non épinglés (restriction API Discord).
- Ne récupère pas les embeds, only le text brut.
- Utile for the systèmes of citation, logs and modération.
