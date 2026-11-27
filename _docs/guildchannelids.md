---
layout: doc
title: $guildChannelIDs[]
translation_key: docs
category: "Entity Info"
function_name: guildChannelIDs
syntax: $guildChannelIDs[guildID;(separator)]
description: "Returns every channel id of the guild."
---
# $guildChannelIDs — Returns every channel id of the guild.

## Syntax

```
$guildChannelIDs[guildID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get channel ids from
- **separator** *(text, optional)* — The separator to use for every channel

## Return Value

- Channel[].

## Usage

```
$guildChannelIDs[guildID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildChannelIDs[10;,]]
```
