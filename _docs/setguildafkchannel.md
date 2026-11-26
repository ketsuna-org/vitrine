---
layout: doc
title: $setGuildAFKChannel[]
translation_key: docs
category: "Moderation"
function_name: setGuildAFKChannel
syntax: $setGuildAFKChannel[guildID;(channelID);(reason)]
description: "Sets the AFK channel for a guild, returns bool."
---
# $setGuildAFKChannel — Sets the AFK channel for a guild, returns bool.

## Syntax

```
$setGuildAFKChannel[guildID;(channelID);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set AFK channel for
- **channelID** *(id, optional)* — The new AFK channel
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildAFKChannel[guildID;(channelID);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildAFKChannel[10;32]]
```
