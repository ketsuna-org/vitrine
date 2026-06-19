---
layout: doc
title: $emojiName
translation_key: docs
category: "Moderation"
function_name: emojiName
syntax: $emojiName[emojiID]
description: Gets the name of a custom emoji from its ID. Returns the name text of the emoji.
---

# $emojiName

The `$emojiName[]` function **récupérer the name of a custom emoji** from its ID Discord.

## Syntax

```
$emojiName[emojiID]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | The ID Discord of the emoji (les chiffres in `<:nom:ID>`). |

## Return value

- **Type** : String
- The emoji name custom.
- String vide if the emoji does not exist or is not accessible.

## Behavior

- Extracted the name since the ID of the emoji.
- Functionne for emojis of any server accessible par the bot.
- The ID can be extracted of a message contenant the emoji.

## Examples

### Identification of emoji

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
  $sendMessage[$channelID[logs];📊 Emoji **$emojiName[$id]** utilisé par $userName in $channelName.]
$endif
```

### List of emojis

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
- L'emoji must be on a server auquel the bot a accès.
- Pratique for logs and les statistiques of usage of emojis.
