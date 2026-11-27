---
layout: doc
title: $stickerFormat[]
translation_key: docs
category: "Stickers"
function_name: stickerFormat
syntax: $stickerFormat[stickerID]
description: "Returns a sticker's format."
---
# $stickerFormat — Returns a sticker's format.

## Syntax

```
$stickerFormat[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to get format of

## Return Value

- StickerFormatType.

## Usage

```
$stickerFormat[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerFormat[80001]]
```
