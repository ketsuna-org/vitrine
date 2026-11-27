---
layout: doc
title: $guildMaximumBitrate[]
translation_key: docs
category: "Entity Info"
function_name: guildMaximumBitrate
syntax: $guildMaximumBitrate[guildID]
description: "Returns the maximum bitrate for voice channels of this guild."
---
# $guildMaximumBitrate — Returns the maximum bitrate for voice channels of this guild.

## Syntax

```
$guildMaximumBitrate[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildMaximumBitrate[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildMaximumBitrate]
```
