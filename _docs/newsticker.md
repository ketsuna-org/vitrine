---
layout: doc
title: $newSticker[]
translation_key: docs
category: "Events"
function_name: newSticker
syntax: $newSticker[property;(separator)]
description: "Sticker of a stickerCreate or stickerUpdate event (the sticker that was removed for stickerDelete). Properties: id, name, description, tags, format, available, authorID."
---
# $newSticker — Sticker of a stickerCreate or stickerUpdate event (the sticker that was removed for stickerDelete). Properties: id, name, description, tags, format, available, authorID.

## Syntax

```
$newSticker[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$newSticker[property] → value
```

## Example

```bdfd
$sendMessage[$newSticker[property]]
```
