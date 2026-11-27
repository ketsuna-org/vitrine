---
layout: doc
title: $setGuildSafetyAlertsChannel[]
translation_key: docs
category: "Moderation"
function_name: setGuildSafetyAlertsChannel
syntax: $setGuildSafetyAlertsChannel[guildID;(channelID);(reason)]
description: "Sets the safety alerts channel for a guild, returns bool."
---
# $setGuildSafetyAlertsChannel — Sets the safety alerts channel for a guild, returns bool.

## Syntax

```
$setGuildSafetyAlertsChannel[guildID;(channelID);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set safety alerts channel for
- **channelID** *(id, optional)* — The new safety alerts channel
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildSafetyAlertsChannel[guildID;(channelID);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildSafetyAlertsChannel[10;31]]
```
