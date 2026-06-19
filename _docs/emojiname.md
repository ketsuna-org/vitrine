---
layout: doc
title: $emojiName
translation_key: docs
category: "Moderation"
function_name: emojiName
syntax: $emojiName[emojiID]
description: Gets the name d'an emoji custom from its ID. Returns the name text de the emoji.
---

# $emojiName

The `$emojiName[]` function **récupérer the name d'an emoji custom** from its ID Discord.

## Syntax

```
$emojiName[emojiID]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | The ID Discord de the emoji (les chiffres dans `<:nom:ID>`). |

## Return value

- **Type** : String
- The emoji name custom.
- String vide if the emoji does not exist or is not accessible.

## Behavior

- Extracted the name since the ID de the emoji.
- Functionne for emojis de any server accessible par the bot.
- The ID can be extracted of a message contenant the emoji.

## Examples

### Identification d'emoji

```bdfd
$let[emojiID;$message[1]]
$let[name;$emojiName[$emojiID]]
$if[$name!=]
  Emoji détecté : **$name** (ID: $emojiID)
$else
  Emoji non found.
$endif
```

### Log of emojis utilisés

```bdfd
$let[id;$message[1]]
$if[$id!=]
  $sendMessage[$channelID[logs];📊 Emoji **$emojiName[$id]** utilisé par $userName dans $channelName.]
$endif
```

### List d'emojis

```bdfd
$title[📋 Emojis of the server]
$description[
$textSplit[$serverEmojis[,];, ]
  $index. $splitText[$index] — $emojiName[$splitText[$index]]
$endTextSplit
]
$sendMessage[]
```

## Notes

- Ne functionne qu'with the emojis customs, pas les emojis Unicode.
- L'emoji must be sur a server auquel the bot a accès.
- Pratique for logs and les statistiques d'usage d'emojis.
