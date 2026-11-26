---
layout: doc
title: $stickerAvailable[]
translation_key: docs
category: "Stickers"
function_name: stickerAvailable
syntax: $stickerAvailable[stickerID]
description: "Returns whether a sticker is available."
---
# $stickerAvailable — Returns whether a sticker is available.

## Syntax

```
$stickerAvailable[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to get availability of

## Return Value

- Boolean.

## Usage

```
$stickerAvailable[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerAvailable[80001]]
```
