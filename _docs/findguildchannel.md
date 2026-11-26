---
layout: doc
title: $findGuildChannel[]
translation_key: docs
category: "Entity Info"
function_name: findGuildChannel
syntax: $findGuildChannel[guildID;query;(returnchannel)]
description: "Finds a channel of a guild"
---
# $findGuildChannel — Finds a channel of a guild

## Syntax

```
$findGuildChannel[guildID;query;(returnchannel)]
```

## Parameters

- **guildID** *(id, required)* — The guild to find the channel on
- **query** *(text, required)* — The id, mention or channel name to find
- **returnchannel** *(boolean, optional)* — Returns the current channel id if none found

## Return Value

- Channel.

## Usage

```
$findGuildChannel[guildID;query;(returnchannel)] → result
```

## Example

```bdfd
$sendMessage[$findGuildChannel[10;gen]]
```
