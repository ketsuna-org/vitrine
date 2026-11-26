---
layout: doc
title: $stickerTags[]
translation_key: docs
category: "Stickers"
function_name: stickerTags
syntax: $stickerTags[stickerID]
description: "Returns a sticker's tags."
---
# $stickerTags — Returns a sticker's tags.

## Syntax

```
$stickerTags[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to pull tags of

## Return Value

- String.

## Usage

```
$stickerTags[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerTags[80001]]
```
