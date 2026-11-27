---
layout: doc
title: $messageStickers[]
translation_key: docs
category: "Entity Info"
function_name: messageStickers
syntax: $messageStickers[channelID;messageID;(separator);(type)]
description: "Retrieves all stickers of this message"
---
# $messageStickers — Retrieves all stickers of this message

## Syntax

```
$messageStickers[channelID;messageID;(separator);(type)]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its stickers
- **separator** *(text, optional)* — The separator to use for every sticker
- **type** *(text, optional)* — The type to return, default is url

## Return Value

- Sticker[].

## Usage

```
$messageStickers[channelID;messageID;(separator);(type)] → result
```

## Example

```bdfd
$sendMessage[$messageStickers[30;1000;,;name]]
```
