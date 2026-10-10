---
layout: doc
title: $getLeaderboardPosition[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardPosition
syntax: $getLeaderboardPosition[type;varName;sort;(userID)]
description: Returns the rank of a user in the ranking of a stored variable (user or globalUser).
---

# $getLeaderboardPosition

The function `$getLeaderboardPosition[]` returns the **rank** (1 for the first, 2 for the second, etc.) of a user in the ranking built from a stored variable.

## Syntax

```
$getLeaderboardPosition[type;varName;sort;(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `type` | Required. The scope of the variable: `user` (variable of the members of the current server) or `globalUser` (global user variable). `server` is refused by this function. |
| `varName` | Required. The name of the variable used for the ranking. |
| `sort` | Required. `desc` (highest value first) or `asc` (lowest value first). |
| `userID` | Optional. The user whose rank is returned. Defaults to the author of the command. |

## Return Value

- **Type**: String (a number)
- The rank of the user in the ranking.
- An empty string if the user does not appear in the ranking.
- An error is raised if the type, the variable name or the sort is invalid.

## Behavior

- The ranking is built from the persisted values of the variable; entries whose value is not a number are ignored.
- With the `user` type, only the members of the current server are ranked.
- It is typically paired with `$getLeaderboardValue`, which reads the entry at a given position.

## See Also

- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Get the entry at a given position
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Global user leaderboard
- [`$serverLeaderboard`](/docs/serverleaderboard) — Server-level leaderboard
- [`$userLeaderboard`](/docs/userleaderboard) — Personal leaderboard

## Examples

### Leaderboard Rank

```bdfd
$title[Leaderboard Rank 🏆]
$description[<@$authorID>, your current rank is **#$getLeaderboardPosition[user;coins;desc]**!]
$color[#FEE75C]
```

### Rank of another user

```bdfd
$sendMessage[Rank of <@$mentioned[1]>: #$getLeaderboardPosition[globalUser;xp;desc;$mentioned[1]]]
```
