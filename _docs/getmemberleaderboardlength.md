---
layout: doc
title: $getMemberLeaderboardLength[]
translation_key: docs
category: "Database"
function_name: getMemberLeaderboardLength
syntax: $getMemberLeaderboardLength[name;(guildID);(length);(decimals)]
description: "Returns the number of pages of the member leaderboard of a variable."
---
# $getMemberLeaderboardLength — Returns the number of pages of the member leaderboard of a variable.

## Syntax

```
$getMemberLeaderboardLength[name;(guildID);(length);(decimals)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **guildID** *(String, optional)* — Server ID (default current)
- **length** *(Number, optional)* — Entries per page (default 1)
- **decimals** *(Boolean, optional)* — Keep the decimals instead of rounding up

## Return Value

- Number.

## Usage

```
$getMemberLeaderboardLength[name;guildID;length;decimals] → result
```

## Example

```bdfd
$sendMessage[$getMemberLeaderboardLength[name;guildID;length;decimals]]
```
