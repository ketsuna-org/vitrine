---
layout: doc
title: $getMemberLeaderboardValue[]
translation_key: docs
category: "Database"
function_name: getMemberLeaderboardValue
syntax: $getMemberLeaderboardValue[name;sortType;(id);(guildID)]
description: "Returns the position of a member in the leaderboard of a variable (0 when absent)."
---
# $getMemberLeaderboardValue — Returns the position of a member in the leaderboard of a variable (0 when absent).

## Syntax

```
$getMemberLeaderboardValue[name;sortType;(id);(guildID)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **sortType** *(String, required)* — asc or desc (default desc)
- **id** *(String, optional)* — Member ID (default current)
- **guildID** *(String, optional)* — Server ID (default current)

## Return Value

- Number.

## Usage

```
$getMemberLeaderboardValue[name;sortType;id;guildID] → result
```

## Example

```bdfd
$sendMessage[$getMemberLeaderboardValue[name;sortType;id;guildID]]
```
