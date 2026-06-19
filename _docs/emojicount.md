---
layout: doc
title: $emojiCount[]
translation_key: docs
category: "Entity Info"
function_name: emojiCount
syntax: $emojiCount
description: Returns the namebre of emojis customs availables on the server Discord.
---

# $emojiCount[] — Number of Emojis

`$emojiCount[]` retourne the namebre total of emojis customs availables on the server, incluant les emojis statics and animés.

## Syntax

```
$emojiCount
```

## Parameters

No parameters.

## Return value

- **Type** : `integer`
- The namebre total of emojis customs.

## Usage

### Simple display

```bdfd
$sendMessage[🎨 **$emojiCount** emojis customs on ce server !]
```

### Placeholders availables

```bdfd
$var[maxEmojiSlots;50]
$if[$boostLevel==1]
$var[maxEmojiSlots;100]
$elseIf[$boostLevel==2]
$var[maxEmojiSlots;150]
$elseIf[$boostLevel==3]
$var[maxEmojiSlots;250]
$endif
$var[remainingSlots;$sub[$var[maxEmojiSlots];$emojiCount]]
$sendMessage[🎨 $emojiCount/$var[maxEmojiSlots] placeholders utilisés. $var[remainingSlots] restants.]
```

### Embed info server

```bdfd
$title[📊 $serverName]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Alerte si quota presque plein

```bdfd
$if[$emojiCount>=$var[maxEmojiSlots]]
$sendMessage[⚠️ All placeholders of emojis are used !]
$elseIf[$emojiCount>=$sub[$var[maxEmojiSlots];10]]
$sendMessage[⚠️ Plus que $sub[$var[maxEmojiSlots];$emojiCount] placeholders of emojis availables.]
$endif
```

## Notes

- La limit of emojis by default est of 50 (statics) + 50 (animés).
- Le level of boost augmente ces limits :
  - Level 1 : 100 statics + 100 animés
  - Level 2 : 150 statics + 150 animés
  - Level 3 : 250 statics + 250 animés
- Pour obtenir la list complete emojis (pas only le compte), use `$serverEmojis[]`.
