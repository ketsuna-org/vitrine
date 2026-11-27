---
layout: doc
title: $guildStickerLimit[]
translation_key: docs
category: "Entity Info"
function_name: guildStickerLimit
syntax: $guildStickerLimit[guildID]
description: "Returns the sticker limit of a guild."
---
# $guildStickerLimit — Returns the sticker limit of a guild.

## Syntax

```
$guildStickerLimit[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildStickerLimit[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildStickerLimit]
```
