---
layout: doc
title: $guildStickerExists[]
translation_key: docs
category: "Entity Info"
function_name: guildStickerExists
syntax: $guildStickerExists[guildID;stickerID]
description: "Returns whether a sticker id exists on a guild."
---
# $guildStickerExists — Returns whether a sticker id exists on a guild.

## Syntax

```
$guildStickerExists[guildID;stickerID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull sticker from
- **stickerID** *(text, required)* — The sticker to check for

## Return Value

- Boolean.

## Usage

```
$guildStickerExists[guildID;stickerID] → result
```

## Example

```bdfd
$sendMessage[$guildStickerExists[10;80001]]
```
