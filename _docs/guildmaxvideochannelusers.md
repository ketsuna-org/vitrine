---
layout: doc
title: $guildMaxVideoChannelUsers[]
translation_key: docs
category: "Entity Info"
function_name: guildMaxVideoChannelUsers
syntax: $guildMaxVideoChannelUsers[guildID]
description: "Returns the maximum video channel users for this guild."
---
# $guildMaxVideoChannelUsers — Returns the maximum video channel users for this guild.

## Syntax

```
$guildMaxVideoChannelUsers[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildMaxVideoChannelUsers[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildMaxVideoChannelUsers]
```
