---
layout: doc
title: $guildShardID[]
translation_key: docs
category: "Entity Info"
function_name: guildShardID
syntax: $guildShardID[guildID]
description: "Returns the server shard ID"
---
# $guildShardID — Returns the server shard ID

## Syntax

```
$guildShardID[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildShardID[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildShardID[10]]
```
