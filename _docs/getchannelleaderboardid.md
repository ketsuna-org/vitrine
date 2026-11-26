---
layout: doc
title: $getChannelLeaderboardID[]
translation_key: docs
category: "Database"
function_name: getChannelLeaderboardID
syntax: $getChannelLeaderboardID[name;sortType;position;(guildID)]
description: "Returns the ID of the channel at a position of the leaderboard of a variable."
---
# $getChannelLeaderboardID — Returns the ID of the channel at a position of the leaderboard of a variable.

## Syntax

```
$getChannelLeaderboardID[name;sortType;position;(guildID)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **sortType** *(String, required)* — asc or desc (default desc)
- **position** *(Number, required)* — Position, from 1
- **guildID** *(String, optional)* — Server ID (default current)

## Return Value

- String.

## Usage

```
$getChannelLeaderboardID[name;sortType;position;guildID] → result
```

## Example

```bdfd
$sendMessage[$getChannelLeaderboardID[name;sortType;position;guildID]]
```
