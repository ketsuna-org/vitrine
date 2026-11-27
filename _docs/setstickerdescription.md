---
layout: doc
title: $setStickerDescription[]
translation_key: docs
category: "Moderation"
function_name: setStickerDescription
syntax: $setStickerDescription[stickerID;description]
description: "Sets a sticker's description, returns bool."
---
# $setStickerDescription — Sets a sticker's description, returns bool.

## Syntax

```
$setStickerDescription[stickerID;description]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to edit
- **description** *(text, required)* — The new description for the sticker

## Return Value

- Boolean.

## Usage

```
$setStickerDescription[stickerID;description] → result
```

## Example

```bdfd
$sendMessage[$setStickerDescription[80001;Waves]]
```
