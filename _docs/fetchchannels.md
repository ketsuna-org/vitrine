---
layout: doc
title: $fetchChannels[]
translation_key: docs
category: "Entity Info"
function_name: fetchChannels
syntax: $fetchChannels[guildID;(channelID)]
description: "Caches all channels of a guild."
---
# $fetchChannels — Caches all channels of a guild.

## Syntax

```
$fetchChannels[guildID;(channelID)]
```

## Parameters

- **guildID** *(id, required)* — The guild to cache channels of
- **channelID** *(id, optional)* — The channel to fetch

## Return Value

- string.

## Usage

```
$fetchChannels[guildID;(channelID)] → result
```

## Example

```bdfd
$fetchChannels[10]
$sendMessage[Done]
```
