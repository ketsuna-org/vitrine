---
layout: doc
title: $sticker[]
translation_key: docs
category: "Responses"
function_name: sticker
syntax: $sticker[stickerID]
description: "Adds a sticker to the response (3 at most, channel messages only: Discord ignores it on a slash command reply)."
---
# $sticker — Adds a sticker to the response (3 at most, channel messages only: Discord ignores it on a slash command reply).

## Syntax

```
$sticker[stickerID]
```

## Parameters

- **stickerID** *(String, required)* — Sticker ID

## Return Value

- None.

## Usage

```
$sticker[stickerID] → result
```

## Example

```bdfd
$sendMessage[$sticker[stickerID]]
```
