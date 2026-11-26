---
layout: doc
title: $guildStickerIDs[]
translation_key: docs
category: "Entity Info"
function_name: guildStickerIDs
syntax: $guildStickerIDs[guildID;(separator)]
description: "Returns every sticker id of the guild."
---
# $guildStickerIDs — Returns every sticker id of the guild.

## Syntax

```
$guildStickerIDs[guildID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sticker ids from
- **separator** *(text, optional)* — The separator to use for every sticker

## Return Value

- Sticker[].

## Usage

```
$guildStickerIDs[guildID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildStickerIDs[10;,]]
```
