---
layout: doc
title: $stickerPackID[]
translation_key: docs
category: "Stickers"
function_name: stickerPackID
syntax: $stickerPackID[stickerID]
description: "Returns a sticker's pack id."
---
# $stickerPackID — Returns a sticker's pack id.

## Syntax

```
$stickerPackID[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to pull pack of

## Return Value

- String.

## Usage

```
$stickerPackID[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerPackID[80001]]
```
