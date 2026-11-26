---
layout: doc
title: $getGuildLeaderboardLength[]
translation_key: docs
category: "Database"
function_name: getGuildLeaderboardLength
syntax: $getGuildLeaderboardLength[name;(length);(decimals)]
description: "Returns the number of pages of the guild leaderboard of a variable."
---
# $getGuildLeaderboardLength — Returns the number of pages of the guild leaderboard of a variable.

## Syntax

```
$getGuildLeaderboardLength[name;(length);(decimals)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **length** *(Number, optional)* — Entries per page (default 1)
- **decimals** *(Boolean, optional)* — Keep the decimals instead of rounding up

## Return Value

- Number.

## Usage

```
$getGuildLeaderboardLength[name;length;decimals] → result
```

## Example

```bdfd
$sendMessage[$getGuildLeaderboardLength[name;length;decimals]]
```
