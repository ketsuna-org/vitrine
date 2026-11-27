---
layout: doc
title: $getUserLeaderboardValue[]
translation_key: docs
category: "Database"
function_name: getUserLeaderboardValue
syntax: $getUserLeaderboardValue[name;sortType;(id)]
description: "Returns the position of a user in the leaderboard of a variable (0 when absent)."
---
# $getUserLeaderboardValue — Returns the position of a user in the leaderboard of a variable (0 when absent).

## Syntax

```
$getUserLeaderboardValue[name;sortType;(id)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **sortType** *(String, required)* — asc or desc (default desc)
- **id** *(String, optional)* — User ID (default current)

## Return Value

- Number.

## Usage

```
$getUserLeaderboardValue[name;sortType;id] → result
```

## Example

```bdfd
$sendMessage[$getUserLeaderboardValue[name;sortType;id]]
```
