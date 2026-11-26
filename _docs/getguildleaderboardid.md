---
layout: doc
title: $getGuildLeaderboardID[]
translation_key: docs
category: "Database"
function_name: getGuildLeaderboardID
syntax: $getGuildLeaderboardID[name;sortType;position]
description: "Returns the ID of the guild at a position of the leaderboard of a variable."
---
# $getGuildLeaderboardID — Returns the ID of the guild at a position of the leaderboard of a variable.

## Syntax

```
$getGuildLeaderboardID[name;sortType;position]
```

## Parameters

- **name** *(String, required)* — Variable name
- **sortType** *(String, required)* — asc or desc (default desc)
- **position** *(Number, required)* — Position, from 1

## Return Value

- String.

## Usage

```
$getGuildLeaderboardID[name;sortType;position] → result
```

## Example

```bdfd
$sendMessage[$getGuildLeaderboardID[name;sortType;position]]
```
