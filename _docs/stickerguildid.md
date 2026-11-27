---
layout: doc
title: $stickerGuildID[]
translation_key: docs
category: "Stickers"
function_name: stickerGuildID
syntax: $stickerGuildID[stickerID]
description: "Returns a sticker's guild id."
---
# $stickerGuildID — Returns a sticker's guild id.

## Syntax

```
$stickerGuildID[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to pull guild of

## Return Value

- Guild.

## Usage

```
$stickerGuildID[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerGuildID[80001]]
```
