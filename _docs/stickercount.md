---
layout: doc
title: $stickerCount[]
translation_key: docs
category: "Entity Info"
function_name: stickerCount
syntax: $stickerCount[(unused)]
description: Returns the sticker count supplied by the host in the guild.stickerCount context variable, or 0.
---

# $stickerCount[] — Number of Stickers

`$stickerCount[]` returns the value of the `guild.stickerCount` context variable supplied by the host. The engine does not query Discord for stickers.

## Syntax

```
$stickerCount[(unused)]
```

## Parameters

One optional argument is accepted but ignored: the stickers of another server cannot be counted.

## Return Value

- **Type**: `integer` (as text)
- The text of `guild.stickerCount` as supplied by the host.
- `0` if the host supplied none.

## Examples

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
```

## Notes

- Because of the default, the result is `0` both for a server without stickers and when the host did not supply the value.
- `$emojiCount` is a different function: it lists the emojis from Discord.
