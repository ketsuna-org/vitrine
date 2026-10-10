---
layout: doc
title: $userLeaderboard[]
translation_key: docs
category: "Variables"
function_name: userLeaderboard
syntax: $userLeaderboard[variable] or $userLeaderboard[variable;sort]
description: Writes the top 10 of the members of the current server, ranked by a user variable, into the description of the first embed.
---

# $userLeaderboard

The `$userLeaderboard` function ranks the **members of the current server** by the value of a user variable (the values written with `$setUserVar`) and writes the **top 10** into the **description of the first embed** of the response. It returns an empty string. It does **not** single out the user who runs the command or show their neighbors.

## Syntax

```
$userLeaderboard[variable]
$userLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable to rank (an empty name raises `A variable name is required.`) |
| `sort` | No | `desc` (descending, default when omitted or empty) or `asc` (ascending), case-insensitive. Any other value raises `Sort type must be asc or desc.` |

## How It Works

1. The stored values of the variable for the members of the **current server** (server-member scope, the one of `$setUserVar`) are read; values that are not numbers are ignored (at most the first 20000 stored values are read). In a bot that still uses the legacy user-variable behavior, the global user values are ranked instead.
2. The entries are sorted according to the specified direction and only the first 10 are kept.
3. The description of the first embed (embed index 1) is **replaced** by one line per entry, in the format `N. username - value` (the username, or the user ID if the user cannot be found; integer values are printed without decimals).
4. The function itself returns an empty string, so its result cannot be captured with `$textSplit` or inside other text: the ranking only appears in the embed description. A `$description` placed in the same command sets the same field, so only use one of them.

An error `No message service configured.` is raised if the command has no message output.

## Typical Usage

Put the function next to the other embed parts (title, color...). To find the rank of the author, use `$getLeaderboardPosition[user;variable;sort]`; to read one entry, use `$getLeaderboardValue[user;variable;sort;position]`.

## Use Cases

- 🏆 **Server ranking**: XP, levels or coins of the members of the server.
- 🎯 **Events**: temporary leaderboards for contests.

## Comparison with other leaderboards

| Function | Ranked entries | Returns |
|----------|-----------|----------|
| `$userLeaderboard` | Members of the current server (user variable) | Top 10 in the embed description |
| `$serverLeaderboard` | Servers (server variable) | Top 10 in the embed description |
| `$globalUserLeaderboard` | Users across servers (global user values) | Top 10 in the embed description |

## Important Notes

- Members without a numeric value for the variable do not appear in the leaderboard.
- At most the first 10 entries are shown.
- `$getLeaderboardPosition` and `$getLeaderboardValue` rank the same values and give the rank of one user or the entry at a given position.
- For users across servers, use `$globalUserLeaderboard`.

## See Also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rank of a user
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Entry at a given position
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Ranking of global user values
- [`$serverLeaderboard`](/docs/serverleaderboard) — Ranking of servers
- [`$getUserVar`](/docs/getuservar) — Read a user variable
- [`$setUserVar`](/docs/setuservar) — Set a user variable

## Examples

### Member Leaderboard

```bdfd
$title[🏆 XP Leaderboard]
$userLeaderboard[xp;desc]
$color[#FEE75C]
$footer[Top 10 of $serverName]
```
