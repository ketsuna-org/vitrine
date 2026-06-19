---
layout: doc
title: $serverLeaderboard[]
translation_key: docs
category: "Variables"
function_name: serverLeaderboard
syntax: $serverLeaderboard[variable] or $serverLeaderboard[variable;sort]
description: Generates a leaderboard of users on the current server based on a variable, sorted in descending order by default.
---

# $serverLeaderboard

The function `$serverLeaderboard` generates a leaderboard of users **limited to the current Discord server** (guild). Unlike `$globalUserLeaderboard` which covers all users of the bot across all servers, this function restricts the scope to the members of the server where the command was executed.

## Syntax

```
$serverLeaderboard[variable]
$serverLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable to rank (user-scoped or guild-scoped) |
| `sort` | No | `desc` (descending, default) or `asc` (ascending) |

## How It Works

1. `$serverLeaderboard` acts as a **placeholder**: it is replaced at runtime by the dedicated leaderboard action.
2. The system only considers user variables for **members of the current server**.
3. The entries are sorted according to the specified direction.
4. The result is a multi-line string where each line represents an entry in the leaderboard.

The format of each line is typically the user's name, which can be parsed using `$textSplit`.

## Typical Usage

```
$textSplit[$serverLeaderboard[xp;desc];\n]
```

Then iterate through the list using `$splitText`, `$getLeaderboardPosition`, and `$getLeaderboardValue`.

## Data Persistence

The variables can be of two types:

- **User-scoped**: specific to each user, defined with [`$setUserVar`](/docs/setuservar). Example: XP earned on the server.
- **Guild-scoped**: specific to the server, defined using server variable functions.

Example of updating server XP:
```
$setUserVar[xp;$sum[$getUserVar[xp];$random[10;50]];$authorID]
```

## Sorting

- **`desc`** (default): Highest values first (XP, messages, coins).
- **`asc`**: Lowest values first (warns, times, penalties).

## Common Use Cases

- 🎮 **XP Leaderboard**: Motivate activity on the server.
- 💬 **Top Messages**: Reward the most active members.
- 🛡️ **Moderation**: Monitor members with the most warns.
- 🎯 **Events**: Temporary leaderboards for contests.

## Important Notes

- Only **current** members of the server are included in the leaderboard.
- Users who do not have the specified variable set are ignored.
- For a cross-server leaderboard, use [`$globalUserLeaderboard`](/docs/globaluserleaderboard).
- To check the rank of a specific user, use [`$userLeaderboard`](/docs/userleaderboard).

## See Also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rank in the active leaderboard
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Value in the active leaderboard
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Cross-server global leaderboard
- [`$userLeaderboard`](/docs/userleaderboard) — Rank of the current user
- [`$textSplit`](/docs/textsplit) — Parse the result
- [`$setUserVar`](/docs/setuservar) — Set a user variable
