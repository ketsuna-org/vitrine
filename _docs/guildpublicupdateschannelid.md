---
layout: doc
title: $guildPublicUpdatesChannelID[]
translation_key: docs
category: "Entity Info"
function_name: guildPublicUpdatesChannelID
syntax: $guildPublicUpdatesChannelID[guildID]
description: "Returns the server's public updates channel ID."
---
# $guildPublicUpdatesChannelID — Returns the server's public updates channel ID.

## Syntax

```
$guildPublicUpdatesChannelID[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Channel.

## Usage

```
$guildPublicUpdatesChannelID[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildPublicUpdatesChannelID]
```
