---
layout: doc
title: $getUserLeaderboardID[]
translation_key: docs
category: "Database"
function_name: getUserLeaderboardID
syntax: $getUserLeaderboardID[name;sortType;position]
description: "Returns the ID of the user at a position of the leaderboard of a variable."
---
# $getUserLeaderboardID — Returns the ID of the user at a position of the leaderboard of a variable.

## Syntax

```
$getUserLeaderboardID[name;sortType;position]
```

## Parameters

- **name** *(String, required)* — Variable name
- **sortType** *(String, required)* — asc or desc (default desc)
- **position** *(Number, required)* — Position, from 1

## Return Value

- String.

## Usage

```
$getUserLeaderboardID[name;sortType;position] → result
```

## Example

```bdfd
$sendMessage[$getUserLeaderboardID[name;sortType;position]]
```
