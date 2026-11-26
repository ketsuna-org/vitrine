---
layout: doc
title: $guildNSFWLevel[]
translation_key: docs
category: "Entity Info"
function_name: guildNSFWLevel
syntax: $guildNSFWLevel[guildID]
description: "Returns the nsfw level for this guild."
---
# $guildNSFWLevel — Returns the nsfw level for this guild.

## Syntax

```
$guildNSFWLevel[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- GuildNSFWLevel.

## Usage

```
$guildNSFWLevel[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildNSFWLevel]
```
