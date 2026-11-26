---
layout: doc
title: $setStickerTags[]
translation_key: docs
category: "Moderation"
function_name: setStickerTags
syntax: $setStickerTags[stickerID;tags]
description: "Sets a sticker's tags, returns bool."
---
# $setStickerTags — Sets a sticker's tags, returns bool.

## Syntax

```
$setStickerTags[stickerID;tags]
```

## Parameters

- **stickerID** *(id, required)* — The sticker to edit
- **tags** *(text, required)* — The new tags for the sticker

## Return Value

- Boolean.

## Usage

```
$setStickerTags[stickerID;tags] → result
```

## Example

```bdfd
$sendMessage[$setStickerTags[80001;wave]]
```
