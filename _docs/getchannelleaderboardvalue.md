---
layout: doc
title: $getChannelLeaderboardValue[]
translation_key: docs
category: "Database"
function_name: getChannelLeaderboardValue
syntax: $getChannelLeaderboardValue[name;sortType;(id);(guildID)]
description: "Returns the position of a channel in the leaderboard of a variable (0 when absent)."
---
# $getChannelLeaderboardValue — Returns the position of a channel in the leaderboard of a variable (0 when absent).

## Syntax

```
$getChannelLeaderboardValue[name;sortType;(id);(guildID)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **sortType** *(String, required)* — asc or desc (default desc)
- **id** *(String, optional)* — Channel ID (default current)
- **guildID** *(String, optional)* — Server ID (default current)

## Return Value

- Number.

## Usage

```
$getChannelLeaderboardValue[name;sortType;id;guildID] → result
```

## Example

```bdfd
$sendMessage[$getChannelLeaderboardValue[name;sortType;id;guildID]]
```
