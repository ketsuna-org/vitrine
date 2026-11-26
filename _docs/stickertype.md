---
layout: doc
title: $stickerType[]
translation_key: docs
category: "Stickers"
function_name: stickerType
syntax: $stickerType[stickerID]
description: "Returns the sticker's type."
---
# $stickerType — Returns the sticker's type.

## Syntax

```
$stickerType[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to get type of

## Return Value

- StickerType.

## Usage

```
$stickerType[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerType[80001]]
```
