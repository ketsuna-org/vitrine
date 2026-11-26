---
layout: doc
title: $stickerSortValue[]
translation_key: docs
category: "Stickers"
function_name: stickerSortValue
syntax: $stickerSortValue[stickerID]
description: "Returns a sticker's sort value."
---
# $stickerSortValue — Returns a sticker's sort value.

## Syntax

```
$stickerSortValue[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to get sort value of

## Return Value

- Number.

## Usage

```
$stickerSortValue[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerSortValue[80001]]
```
