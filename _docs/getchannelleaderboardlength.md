---
layout: doc
title: $getChannelLeaderboardLength[]
translation_key: docs
category: "Database"
function_name: getChannelLeaderboardLength
syntax: $getChannelLeaderboardLength[name;(guildID);(length);(decimals)]
description: "Returns the number of pages of the channel leaderboard of a variable."
---
# $getChannelLeaderboardLength — Returns the number of pages of the channel leaderboard of a variable.

## Syntax

```
$getChannelLeaderboardLength[name;(guildID);(length);(decimals)]
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
$getChannelLeaderboardLength[name;guildID;length;decimals] → result
```

## Example

```bdfd
$sendMessage[$getChannelLeaderboardLength[name;guildID;length;decimals]]
```
