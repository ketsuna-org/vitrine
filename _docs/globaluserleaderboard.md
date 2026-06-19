---
layout: doc
title: $globalUserLeaderboard[]
translation_key: docs
category: "Variables"
function_name: globalUserLeaderboard
syntax: $globalUserLeaderboard[variable] or $globalUserLeaderboard[variable;sort]
description: Generates a global ranking of all users based on a variable, sorted in descending order by default.
---

# $globalUserLeaderboard

The function `$globalUserLeaderboard` generates a global ranking of all users of the bot, based on the values of a user variable. It is the primary tool to create cross-server leaderboards and motivate competition between users.

## Syntax

```
$globalUserLeaderboard[variable]
$globalUserLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the global user variable to rank |
| `sort` | No | `desc` (descending, default) or `asc` (ascending) |

## How It Works

1. `$globalUserLeaderboard` is a **placeholder**: it is replaced at runtime by the dedicated leaderboard action.
2. The system scans the global variables of **all users** of the bot.
3. The entries are sorted according to the specified direction.
4. The result is a multiline string where each line represents an entry of the leaderboard.

The format of each line is typically:
```
username
```
Or potentially a combined format depending on the bot configuration.

## Typical Usage

The classic pattern to use a leaderboard:

```
$textSplit[$globalUserLeaderboard[score;desc];\n]
```

Then iterate through the elements with `$splitText[index]`, `$getLeaderboardPosition` and `$getLeaderboardValue`.

## Data Persistence

For the ranking to be meaningful, user variables must be populated beforehand via:

- [`$setUserVar`](/docs/setuservar) — Set a variable for a user
- [`$getUserVar`](/docs/getuservar) — Read a user variable

Example of score update:
```
$setUserVar[score;$sum[$getUserVar[score];10];$authorID]
```

## Sorting

- **`desc`** (default): highest values first — ideal for scores, XP, coins.
- **`asc`**: lowest values first — useful for time, penalties, or reversed rankings.

## Important Notes

- Users who do not have the specified variable are ignored in the ranking.
- The number of entries returned depends on the bot configuration and the leaderboard action.
- For a ranking limited to a specific server, use [`$serverLeaderboard`](/docs/serverleaderboard).
- To see only the current user's position, use [`$userLeaderboard`](/docs/userleaderboard).

## See Also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rank in the active leaderboard
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Value in the active leaderboard
- [`$serverLeaderboard`](/docs/serverleaderboard) — Ranking limited to the server
- [`$userLeaderboard`](/docs/userleaderboard) — Current user's position
- [`$textSplit`](/docs/textsplit) — Parse the result
- [`$setUserVar`](/docs/setuservar) — Set a user variable
