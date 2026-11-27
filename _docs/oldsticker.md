---
layout: doc
title: $oldSticker[]
translation_key: docs
category: "Events"
function_name: oldSticker
syntax: $oldSticker[property;(separator)]
description: "Sticker before a stickerUpdate event. Properties: id, name, description, tags, format, available, authorID."
---
# $oldSticker — Sticker before a stickerUpdate event. Properties: id, name, description, tags, format, available, authorID.

## Syntax

```
$oldSticker[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$oldSticker[property] → value
```

## Example

```bdfd
$sendMessage[$oldSticker[property]]
```
