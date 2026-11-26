---
layout: doc
title: $stickerCreatedAt[]
translation_key: docs
category: "Stickers"
function_name: stickerCreatedAt
syntax: $stickerCreatedAt[stickerID]
description: "Returns a sticker's creation timestamp."
---
# $stickerCreatedAt — Returns a sticker's creation timestamp.

## Syntax

```
$stickerCreatedAt[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to pull timestamp of

## Return Value

- Number.

## Usage

```
$stickerCreatedAt[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerCreatedAt[80001]]
```
