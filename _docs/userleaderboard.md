---
layout: doc
title: $userLeaderboard[]
translation_key: docs
category: "Variables"
function_name: userLeaderboard
syntax: $userLeaderboard[variable] or $userLeaderboard[variable;sort]
description: Displays the position of the current user in a leaderboard based on a variable, along with nearby users.
---

# $userLeaderboard

The `$userLeaderboard` function displays the position of the **current user** in a leaderboard, surrounded by the users who immediately precede and follow them. Unlike `$globalUserLeaderboard` or `$serverLeaderboard` which return the full leaderboard, this function focuses on the user's immediate context.

## Syntax

```
$userLeaderboard[variable]
$userLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable to rank |
| `sort` | No | `desc` (descending, default) or `asc` (ascending) |

## How It Works

1. `$userLeaderboard` is a **placeholder** resolved at runtime by the leaderboard action.
2. The system identifies the position of the current user in the leaderboard.
3. It returns a neighborhood around that position (the user + a few neighbors above and below).
4. The current user is identifiable by their username or ID in the returned lines.

## Typical Usage

```
$textSplit[$userLeaderboard[score;desc];\n]
```

Then loop through the entries with `$splitText`, `$getLeaderboardPosition`, and `$getLeaderboardValue`.

## Use Cases

- 📊 **Personal dashboard**: show the user where they stand.
- 🎯 **Motivation**: display direct neighbors to encourage competition.
- 🏆 **Congratulation messages**: detect if the user is on the podium.
- 📈 **Progression tracking**: see the gap with players ahead of you.

## Comparison with other leaderboards

| Function | Scope | Returns |
|----------|-----------|----------|
| `$userLeaderboard` | Current user | Neighborhood around the user |
| `$serverLeaderboard` | Current server | Complete leaderboard of the server |
| `$globalUserLeaderboard` | All users | Complete global leaderboard |

## Important Notes

- The user must have a value set for the specified variable, otherwise they will not appear in the leaderboard.
- The number of entries returned around the user depends on the bot's configuration.
- `$getLeaderboardPosition` and `$getLeaderboardValue` work normally during iteration.
- For a complete leaderboard, prefer `$globalUserLeaderboard` or `$serverLeaderboard`.

## See Also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rank in the active leaderboard
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Value in the active leaderboard
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Complete global leaderboard
- [`$serverLeaderboard`](/docs/serverleaderboard) — Complete server leaderboard
- [`$textSplit`](/docs/textsplit) — Parse the result
- [`$getUserVar`](/docs/getuservar) — Read a user variable
- [`$setUserVar`](/docs/setuservar) — Set a user variable
