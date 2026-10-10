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
| `type` | Required. The scope of the variable: `user` (values of the members of the current server, as written by `$setUserVar`) or `globalUser` (global user values, as written by `$setVar[name;value;userID]`). Case-insensitive. `server` is refused by this function (`Variable type must be user or globalUser.`). In a bot that still uses the legacy user-variable behavior, `user` ranks the global user values like `globalUser`. |
| `varName` | Required. The name of the variable used for the ranking (an empty name raises `A variable name is required.`). |
| `sort` | Required. `desc` (highest value first) or `asc` (lowest value first), case-insensitive. Anything else, including an empty value, raises `Sort type must be asc or desc.` |
| `userID` | Optional. The user whose rank is returned. If omitted or empty, the author of the command is used. |

## Return Value

- **Type**: String (a number)
- The rank of the user in the ranking.
- An empty string if the user does not appear in the ranking.
- An error is raised if the type, the variable name or the sort is invalid.

## Behavior

- The ranking is built from the persisted values of the variable; entries whose value is not a number are ignored. At most the first 20000 stored values are read.
- With the `user` type, only the members of the current server are ranked.
- It is typically paired with `$getLeaderboardValue`, which reads the entry at a given position.

## See Also

- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Get the entry at a given position
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Top 10 of global user values
- [`$serverLeaderboard`](/docs/serverleaderboard) — Top 10 of servers
- [`$userLeaderboard`](/docs/userleaderboard) — Top 10 of the members of the server

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
