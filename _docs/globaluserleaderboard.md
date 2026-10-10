---
layout: doc
title: $globalUserLeaderboard[]
translation_key: docs
category: "Variables"
function_name: globalUserLeaderboard
syntax: $globalUserLeaderboard[variable] or $globalUserLeaderboard[variable;sort]
description: Writes the top 10 of the global user values of a variable into the description of the first embed, sorted in descending order by default.
---

# $globalUserLeaderboard

The function `$globalUserLeaderboard` ranks the **global user values** of a variable (the values written with `$setVar[name;value;userID]`, shared across servers) and writes the **top 10** into the **description of the first embed** of the response. It returns an empty string.

## Syntax

```
$globalUserLeaderboard[variable]
$globalUserLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable to rank (an empty name raises `A variable name is required.`) |
| `sort` | No | `desc` (descending, default when omitted or empty) or `asc` (ascending), case-insensitive. Any other value raises `Sort type must be asc or desc.` |

## How It Works

1. The stored values of the variable for **all users** (user scope) are read; values that are not numbers are ignored (at most the first 20000 stored values are read).
2. The entries are sorted according to the specified direction and only the first 10 are kept.
3. The description of the first embed (embed index 1) is **replaced** by one line per entry, in the format `N. username - value` (the username, or the user ID if the user cannot be found; integer values are printed without decimals).
4. The function itself returns an empty string, so its result cannot be captured with `$textSplit` or inside other text: the ranking only appears in the embed description. A `$description` placed in the same command sets the same field, so only use one of them.

An error `No message service configured.` is raised if the command has no message output.

## Typical Usage

Put the function next to the other embed parts (title, color...). To build your own display, read the entries one by one with `$getLeaderboardValue[globalUser;variable;sort;position]`.

## Data Persistence

For the ranking to be meaningful, the global user values must be populated beforehand via [`$setVar`](/docs/setvar) with a user ID (read them with [`$getVar`](/docs/getvar)). Values written with `$setUserVar` are server-member values (except in bots that still use the legacy user-variable behavior) and are ranked by [`$userLeaderboard`](/docs/userleaderboard) instead.

Example of score update:
```
$setVar[score;$sum[$getVar[score;$authorID];10];$authorID]
```

## Sorting

- **`desc`** (default): highest values first — ideal for scores, XP, coins.
- **`asc`**: lowest values first — useful for time, penalties, or reversed rankings.

## Important Notes

- Users who do not have the specified variable are ignored in the ranking, as are values that are not numbers.
- At most the first 10 entries are shown.
- For the members of the current server, use [`$userLeaderboard`](/docs/userleaderboard); for a ranking of servers, use [`$serverLeaderboard`](/docs/serverleaderboard).
- To get the rank of one user, use [`$getLeaderboardPosition`](/docs/getleaderboardposition).

## See Also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rank of a user
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Entry at a given position
- [`$serverLeaderboard`](/docs/serverleaderboard) — Ranking of servers
- [`$userLeaderboard`](/docs/userleaderboard) — Ranking of the members of the server
- [`$setVar`](/docs/setvar) — Set a global user value

## Examples

### Global Economy Ranking

```bdfd
$title[🌍 Global Economy Leaderboard]
$globalUserLeaderboard[coins;desc]
$color[#FEE75C]
```
