---
layout: doc
title: $stickerName[]
translation_key: docs
category: "Stickers"
function_name: stickerName
syntax: $stickerName[stickerID]
description: "Returns a sticker name."
---
# $stickerName — Returns a sticker name.

## Syntax

```
$stickerName[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to pull name of

## Return Value

- String.

## Usage

```
$stickerName[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerName[80001]]
```
