---
layout: doc
title: $guildMaxStageVideoChannelUsers[]
translation_key: docs
category: "Entity Info"
function_name: guildMaxStageVideoChannelUsers
syntax: $guildMaxStageVideoChannelUsers[guildID]
description: "Returns the maximum video channel users for stage channels of this guild."
---
# $guildMaxStageVideoChannelUsers — Returns the maximum video channel users for stage channels of this guild.

## Syntax

```
$guildMaxStageVideoChannelUsers[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildMaxStageVideoChannelUsers[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildMaxStageVideoChannelUsers]
```
