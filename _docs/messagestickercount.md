---
layout: doc
title: $messageStickerCount[]
translation_key: docs
category: "Entity Info"
function_name: messageStickerCount
syntax: $messageStickerCount[channelID;messageID]
description: "Retrieves sticker count of this message"
---
# $messageStickerCount — Retrieves sticker count of this message

## Syntax

```
$messageStickerCount[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its sticker count

## Return Value

- Number.

## Usage

```
$messageStickerCount[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$messageStickerCount[30;1000]]
```
