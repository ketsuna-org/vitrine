---
layout: doc
title: $serverLeaderboard[]
translation_key: docs
category: "Variables"
function_name: serverLeaderboard
syntax: $serverLeaderboard[variable] or $serverLeaderboard[variable;sort]
description: Ranks the servers by the value of a server variable and writes the top 10 into the description of the first embed, sorted in descending order by default.
---

# $serverLeaderboard

The function `$serverLeaderboard` ranks the **servers** (guilds) by the value of a **server variable** (the values written with `$setServerVar` / `$setGuildVar`) and writes the **top 10** into the **description of the first embed** of the response. Each entry is a server, not a user. It returns an empty string.

## Syntax

```
$serverLeaderboard[variable]
$serverLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the server variable to rank (an empty name raises `A variable name is required.`) |
| `sort` | No | `desc` (descending, default when omitted or empty) or `asc` (ascending), case-insensitive. Any other value raises `Sort type must be asc or desc.` |

## How It Works

1. The stored values of the server variable for **every server that has one** are read; values that are not numbers are ignored (at most the first 20000 stored values are read).
2. The entries are sorted according to the specified direction and only the first 10 are kept.
3. The description of the first embed (embed index 1) is **replaced** by one line per entry, in the format `N. server name - value` (the server ID is used if the name cannot be found; integer values are printed without decimals).
4. The function itself returns an empty string, so its result cannot be captured with `$textSplit` or inside other text: the ranking only appears in the embed description. A `$description` placed in the same command sets the same field, so only use one of them.

An error `No message service configured.` is raised if the command has no message output.

## Typical Usage

Put the function next to the other embed parts (title, color...). To build your own display, read the entries one by one with `$getLeaderboardValue[server;variable;sort;position]`.

## Data Persistence

The ranked variable must be a **server variable**, defined with [`$setServerVar`](/docs/setservervar) or [`$setGuildVar`](/docs/setguildvar).

Example of updating the score of the current server:
```
$setServerVar[xp;$sum[$getServerVar[xp];$random[10;50]]]
```

## Sorting

- **`desc`** (default): Highest values first (XP, messages, coins).
- **`asc`**: Lowest values first (warns, times, penalties).

## Common Use Cases

- 🏆 **Server ranking**: compare the servers where the bot is used, for example by a message counter stored in a server variable.
- 🎯 **Events**: temporary rankings of servers for contests.

## Important Notes

- The entries are servers: use [`$userLeaderboard`](/docs/userleaderboard) to rank the members of the current server, or [`$globalUserLeaderboard`](/docs/globaluserleaderboard) to rank users across servers.
- Servers that do not have the specified variable set are ignored, as are values that are not numbers.
- At most the first 10 entries are shown.

## See Also

- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Entry at a given position (type `server`)
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Ranking of global user values
- [`$userLeaderboard`](/docs/userleaderboard) — Ranking of the members of the server
- [`$setServerVar`](/docs/setservervar) — Set a server variable

## Examples

### Server Level Leaderboard

```bdfd
$title[🏆 Server Level Leaderboard]
$serverLeaderboard[level;desc]
$color[#FEE75C]
```
