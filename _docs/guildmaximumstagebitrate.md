---
layout: doc
title: $guildMaximumStageBitrate[]
translation_key: docs
category: "Entity Info"
function_name: guildMaximumStageBitrate
syntax: $guildMaximumStageBitrate[guildID]
description: "Returns the maximum bitrate for stage channels of this guild."
---
# $guildMaximumStageBitrate — Returns the maximum bitrate for stage channels of this guild.

## Syntax

```
$guildMaximumStageBitrate[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildMaximumStageBitrate[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildMaximumStageBitrate]
```
