---
layout: doc
title: $guildExplicitContentFilter[]
translation_key: docs
category: "Entity Info"
function_name: guildExplicitContentFilter
syntax: $guildExplicitContentFilter[guildID]
description: "Returns the explicit content filter level for this guild."
---
# $guildExplicitContentFilter — Returns the explicit content filter level for this guild.

## Syntax

```
$guildExplicitContentFilter[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- GuildExplicitContentFilter.

## Usage

```
$guildExplicitContentFilter[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildExplicitContentFilter]
```
