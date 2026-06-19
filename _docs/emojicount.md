---
layout: doc
title: $emojiCount
translation_key: docs
category: "Entity Info"
function_name: emojiCount
syntax: $emojiCount
description: Returns the number of custom emojis available on the Discord server.
---

# $emojiCount — Number of Emojis

The `$emojiCount` function returns the total number of custom emojis available on the server, including both static and animated emojis.

## Syntax

```
$emojiCount
```

## Parameters

No parameters.

## Return value

- **Type**: `integer`
- The total number of custom emojis.

## Usage

### Simple display

```bdfd
$sendMessage[🎨 There are **$emojiCount** custom emojis on this server!]
```

### Emoji slots available

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
$sendMessage[🎨 $emojiCount/$var[maxEmojiSlots] emoji slots used. $var[remainingSlots] remaining.]
```

### Server Info Embed

```bdfd
$title[📊 $serverName]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Warning if limit is almost reached

```bdfd
$if[$emojiCount>=$var[maxEmojiSlots]]
$sendMessage[⚠️ All emoji slots are used!]
$elseIf[$emojiCount>=$sub[$var[maxEmojiSlots];10]]
$sendMessage[⚠️ Only $sub[$var[maxEmojiSlots];$emojiCount] emoji slots are available.]
$endif
```

## Notes

- The default emoji limit is 50 static + 50 animated emojis.
- The server boost level increases these limits:
  - Level 1: 100 static + 100 animated
  - Level 2: 150 static + 150 animated
  - Level 3: 250 static + 250 animated
- To get the complete list of emojis (not just the count), use `$serverEmojis`.
