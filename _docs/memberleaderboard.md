---
layout: doc
title: $memberLeaderboard[]
translation_key: docs
category: "Database"
function_name: memberLeaderboard
syntax: $memberLeaderboard[name;(guildID);(sortType);(max);(page);(separator);(envValue);(envPosition);(code)]
description: "Builds a text leaderboard of a member variable, one row per line, or one row per run of the code."
---
# $memberLeaderboard — Builds a text leaderboard of a member variable, one row per line, or one row per run of the code.

## Syntax

```
$memberLeaderboard[name;(guildID);(sortType);(max);(page);(separator);(envValue);(envPosition);(code)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **guildID** *(String, optional)* — Server ID (default current)
- **sortType** *(String, optional)* — asc or desc
- **max** *(Number, optional)* — Rows per page (default 10)
- **page** *(Number, optional)* — Page (default 1)
- **separator** *(String, optional)* — Row separator (default new line)
- **envValue** *(String, optional)* — $env name that holds {id, username, value} in the code
- **envPosition** *(String, optional)* — $env name that holds the position in the code
- **code** *(String, optional)* — Code run per row; its $return gives the row

## Return Value

- String.

## Usage

```
$memberLeaderboard[name;guildID;sortType;max;page;separator;envValue;envPosition;code] → result
```

## Example

```bdfd
$sendMessage[$memberLeaderboard[name;guildID;sortType;max;page;separator;envValue;envPosition;code]]
```
