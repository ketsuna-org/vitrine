---
layout: doc
title: $getLeaderboardValue[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardValue
syntax: $getLeaderboardValue[type;varName;sort;position;(returnType)]
description: Returns the entry (name, ID or value) found at a given position in the ranking of a stored variable.
---

# $getLeaderboardValue

The function `$getLeaderboardValue[]` returns the entry found at a given **position** of the ranking built from a stored variable.

## Syntax

```
$getLeaderboardValue[type;varName;sort;position;(returnType)]
```

## Parameters

| Parameter | Description |
|---|---|
| `type` | Required. The scope of the variable: `user` (values of the members of the current server, as written by `$setUserVar`), `globalUser` (global user values, as written by `$setVar[name;value;userID]`) or `server` (values of server variables, ranked per server). Case-insensitive; any other value raises `Variable type must be user, globalUser or server.` In a bot that still uses the legacy user-variable behavior, `user` ranks the global user values like `globalUser`. |
| `varName` | Required. The name of the variable used for the ranking (an empty name raises `A variable name is required.`). |
| `sort` | Required. `desc` (highest value first) or `asc` (lowest value first), case-insensitive. Anything else, including an empty value, raises `Sort type must be asc or desc.` |
| `position` | Required. The rank to read (integer of 1 or more, otherwise the error `Position must be a positive integer.` is raised). |
| `returnType` | Optional. `id` (the ID of the entry), `value` (its value) or `none` (name and value). Case-insensitive; empty or omitted means `none`. Any other value raises `Return type must be id, value or none.` |

## Return Value

- **Type**: String
- With `none` (default): `Name - value`, where the name is the username (or the server name for the `server` type), or the ID if the name cannot be found. A value without decimals is printed as an integer (`7`, not `7.0`).
- With `id`: the ID of the user or server at this position.
- With `value`: the value of the variable at this position.
- An empty string if the position is beyond the end of the ranking.
- An error is raised if the type, the variable name, the sort, the position or the return type is invalid.

## Behavior

- The ranking is built from the persisted values of the variable; entries whose value is not a number are ignored. At most the first 20000 stored values are read.
- With the `user` type, only the members of the current server are ranked.
- It is typically paired with `$getLeaderboardPosition`, which gives the rank of a user.

## See Also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Get the rank of a user
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Top 10 of global user values
- [`$serverLeaderboard`](/docs/serverleaderboard) — Top 10 of servers
- [`$userLeaderboard`](/docs/userleaderboard) — Top 10 of the members of the server

## Examples

### Best player

```bdfd
$title[Leaderboard Score]
$description[First place: **$getLeaderboardValue[user;coins;desc;1]**]
$color[#57F287]
```

### Score of the third place

```bdfd
$sendMessage[Score of the 3rd: $getLeaderboardValue[user;coins;desc;3;value]]
```
