---
layout: doc
title: $setGuildRulesChannel[]
translation_key: docs
category: "Moderation"
function_name: setGuildRulesChannel
syntax: $setGuildRulesChannel[guildID;(channelID);(reason)]
description: "Sets the rules channel for a guild, returns bool."
---
# $setGuildRulesChannel — Sets the rules channel for a guild, returns bool.

## Syntax

```
$setGuildRulesChannel[guildID;(channelID);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set rules channel for
- **channelID** *(id, optional)* — The new rules channel
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildRulesChannel[guildID;(channelID);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildRulesChannel[10;30]]
```
