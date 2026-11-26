---
layout: doc
title: $guildRaidDetectedAt[]
translation_key: docs
category: "Entity Info"
function_name: guildRaidDetectedAt
syntax: $guildRaidDetectedAt[guildID]
description: "Returns when a raid was detected on a guild."
---
# $guildRaidDetectedAt — Returns when a raid was detected on a guild.

## Syntax

```
$guildRaidDetectedAt[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildRaidDetectedAt[guildID] → result
```

## Example

```bdfd
$sendMessage[Value: $guildRaidDetectedAt]
```
