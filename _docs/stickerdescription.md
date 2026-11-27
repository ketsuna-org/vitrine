---
layout: doc
title: $stickerDescription[]
translation_key: docs
category: "Stickers"
function_name: stickerDescription
syntax: $stickerDescription[stickerID]
description: "Returns a sticker's description."
---
# $stickerDescription — Returns a sticker's description.

## Syntax

```
$stickerDescription[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to pull description of

## Return Value

- String.

## Usage

```
$stickerDescription[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerDescription[80001]]
```
