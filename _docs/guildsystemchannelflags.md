---
layout: doc
title: $guildSystemChannelFlags[]
translation_key: docs
category: "Entity Info"
function_name: guildSystemChannelFlags
syntax: $guildSystemChannelFlags[guildID;(separator)]
description: "Returns the system channel flags of a guild."
---
# $guildSystemChannelFlags — Returns the system channel flags of a guild.

## Syntax

```
$guildSystemChannelFlags[guildID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data
- **separator** *(text, optional)* — The separator to use for every flag

## Return Value

- GuildSystemChannelFlags[].

## Usage

```
$guildSystemChannelFlags[guildID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildSystemChannelFlags]
```
