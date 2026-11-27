---
layout: doc
title: $messageSticker[]
translation_key: docs
category: "Entity Info"
function_name: messageSticker
syntax: $messageSticker[channelID;messageID;index]
description: "Retrieves a sticker url of this message"
---
# $messageSticker — Retrieves a sticker url of this message

## Syntax

```
$messageSticker[channelID;messageID;index]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its stickers
- **index** *(number, required)* — The index to get sticker

## Return Value

- Sticker.

## Usage

```
$messageSticker[channelID;messageID;index] → result
```

## Example

```bdfd
$sendMessage[$messageSticker[30;1000;0]]
```
