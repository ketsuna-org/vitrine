---
layout: doc
title: $setGuildPublicUpdatesChannel[]
translation_key: docs
category: "Moderation"
function_name: setGuildPublicUpdatesChannel
syntax: $setGuildPublicUpdatesChannel[guildID;(channelID);(reason)]
description: "Sets the public updates channel for a guild, returns bool."
---
# $setGuildPublicUpdatesChannel — Sets the public updates channel for a guild, returns bool.

## Syntax

```
$setGuildPublicUpdatesChannel[guildID;(channelID);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set public updates channel for
- **channelID** *(id, optional)* — The new public updates channel
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildPublicUpdatesChannel[guildID;(channelID);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildPublicUpdatesChannel[10;31]]
```
