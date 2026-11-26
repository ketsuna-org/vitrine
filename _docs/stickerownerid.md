---
layout: doc
title: $stickerOwnerID[]
translation_key: docs
category: "Stickers"
function_name: stickerOwnerID
syntax: $stickerOwnerID[stickerID]
description: "Returns the user who added the sticker."
---
# $stickerOwnerID — Returns the user who added the sticker.

## Syntax

```
$stickerOwnerID[stickerID]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to pull owner of

## Return Value

- User.

## Usage

```
$stickerOwnerID[stickerID] → result
```

## Example

```bdfd
$sendMessage[$stickerOwnerID[80001]]
```
