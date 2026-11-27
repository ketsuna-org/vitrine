---
layout: doc
title: $getGuildLeaderboardValue[]
translation_key: docs
category: "Database"
function_name: getGuildLeaderboardValue
syntax: $getGuildLeaderboardValue[name;sortType;(id)]
description: "Returns the position of a guild in the leaderboard of a variable (0 when absent)."
---
# $getGuildLeaderboardValue — Returns the position of a guild in the leaderboard of a variable (0 when absent).

## Syntax

```
$getGuildLeaderboardValue[name;sortType;(id)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **sortType** *(String, required)* — asc or desc (default desc)
- **id** *(String, optional)* — Guild ID (default current)

## Return Value

- Number.

## Usage

```
$getGuildLeaderboardValue[name;sortType;id] → result
```

## Example

```bdfd
$sendMessage[$getGuildLeaderboardValue[name;sortType;id]]
```
