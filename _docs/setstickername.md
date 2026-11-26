---
layout: doc
title: $setStickerName[]
translation_key: docs
category: "Moderation"
function_name: setStickerName
syntax: $setStickerName[stickerID;name]
description: "Sets a sticker's name, returns bool."
---
# $setStickerName — Sets a sticker's name, returns bool.

## Syntax

```
$setStickerName[stickerID;name]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to edit
- **name** *(text, required)* — The new name for the sticker

## Return Value

- Boolean.

## Usage

```
$setStickerName[stickerID;name] → result
```

## Example

```bdfd
$sendMessage[$setStickerName[80001;Hi]]
```
