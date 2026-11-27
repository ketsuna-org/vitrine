---
layout: doc
title: $stickerURL[]
translation_key: docs
category: "Stickers"
function_name: stickerURL
syntax: $stickerURL[stickerID]
description: "Returns a sticker url."
---
# $stickerURL — Returns a sticker url.

## Syntax

```
$stickerURL[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to pull url of

## Return Value

- URL.

## Usage

```
$stickerURL[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerURL[80001]]
```
