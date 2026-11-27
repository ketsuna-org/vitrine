---
layout: doc
title: $getMemberLeaderboardID[]
translation_key: docs
category: "Database"
function_name: getMemberLeaderboardID
syntax: $getMemberLeaderboardID[name;sortType;position;(guildID)]
description: "Returns the ID of the member at a position of the leaderboard of a variable."
---
# $getMemberLeaderboardID — Returns the ID of the member at a position of the leaderboard of a variable.

## Syntax

```
$getMemberLeaderboardID[name;sortType;position;(guildID)]
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
$getMemberLeaderboardID[name;sortType;position;guildID] → result
```

## Example

```bdfd
$sendMessage[$getMemberLeaderboardID[name;sortType;position;guildID]]
```
