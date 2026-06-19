---
layout: doc
title: $stickerCount[]
translation_key: docs
category: "Entity Info"
function_name: stickerCount
syntax: $stickerCount
description: Returns the number of custom stickers available on the Discord server.
---

# $stickerCount[] — Number of Stickers

`$stickerCount[]` returns the number of custom stickers available on the Discord server.

## Syntax

```
$stickerCount
```

## Parameters

None.

## Return Value

- **Type**: `integer`
- The number of custom stickers on the server.

## Usage

### Simple display

```bdfd
$sendMessage[🏷️ **$stickerCount** custom stickers on this server.]
```

### Statistics embed

```bdfd
$title[📊 Content of $serverName]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Availability check

```bdfd
$if[$stickerCount==0]
  $sendMessage[ℹ️ This server does not have any custom stickers yet.]
$else
  $sendMessage[✅ $stickerCount stickers available!]
$endif
```

### Comparison of emojis and stickers

```bdfd
$title[Content of the server]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[📦 Total content;$sum[$emojiCount;$stickerCount];yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Stickers are different from emojis: they are larger images, often animated (APNG or Lottie).
- The sticker limit depends on the server boost level:
  - Level 0: 5 stickers (standard), 0 custom
  - Level 1: 15 custom slots
  - Level 2: 30 custom slots
  - Level 3: 60 custom slots
- Custom stickers can only be used on the server where they were created (except for partnered/verified servers).
