---
layout: doc
title: $getUserLeaderboardLength[]
translation_key: docs
category: "Database"
function_name: getUserLeaderboardLength
syntax: $getUserLeaderboardLength[name;(length);(decimals)]
description: "Returns the number of pages of the user leaderboard of a variable."
---
# $getUserLeaderboardLength — Returns the number of pages of the user leaderboard of a variable.

## Syntax

```
$getUserLeaderboardLength[name;(length);(decimals)]
```

## Parameters

- **name** *(String, required)* — Variable name
- **length** *(Number, optional)* — Entries per page (default 1)
- **decimals** *(Boolean, optional)* — Keep the decimals instead of rounding up

## Return Value

- Number.

## Usage

```
$getUserLeaderboardLength[name;length;decimals] → result
```

## Example

```bdfd
$sendMessage[$getUserLeaderboardLength[name;length;decimals]]
```
