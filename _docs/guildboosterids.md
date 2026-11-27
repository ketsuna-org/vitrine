---
layout: doc
title: $guildBoosterIDs[]
translation_key: docs
category: "Entity Info"
function_name: guildBoosterIDs
syntax: $guildBoosterIDs[guildID;(separator)]
description: "Returns all current boosters of a guild."
---
# $guildBoosterIDs — Returns all current boosters of a guild.

## Syntax

```
$guildBoosterIDs[guildID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data
- **separator** *(text, optional)* — The separator to use for every member

## Return Value

- Member[].

## Usage

```
$guildBoosterIDs[guildID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildBoosterIDs[10;,]]
```
