---
layout: doc
title: $setGuildSystemChannel[]
translation_key: docs
category: "Moderation"
function_name: setGuildSystemChannel
syntax: $setGuildSystemChannel[guildID;(channelID);(reason)]
description: "Sets the system channel for a guild, returns bool."
---
# $setGuildSystemChannel — Sets the system channel for a guild, returns bool.

## Syntax

```
$setGuildSystemChannel[guildID;(channelID);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set system channel for
- **channelID** *(id, optional)* — The new system channel
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildSystemChannel[guildID;(channelID);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildSystemChannel[10;30]]
```
