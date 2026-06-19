---
layout: doc
title: $getLeaderboardValue[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardValue
syntax: $getLeaderboardValue
description: Returns the value (score, points, etc.) associated with the current position in the active leaderboard.
---

# $getLeaderboardValue

The function `$getLeaderboardValue` returns the value associated with the current position in the active leaderboard. This can be a score, a number of coins, XP points, or any other variable the ranking is based on.

This function only makes sense **in the context of iterating through a leaderboard** — that is, after calling `$globalUserLeaderboard`, `$serverLeaderboard` or `$userLeaderboard` and while iterating through their results with `$textSplit`.

## How It Works

When iterating through a leaderboard, each entry contains an identifier (user) and a value (the score). `$getLeaderboardValue` exposes this value for the entry currently being processed.

The returned value corresponds to the internal variable `((leaderboard.value))` which is resolved at runtime by the dedicated leaderboard action.

## Use Cases

- Display each player's score in a ranking
- Compare values between different positions
- Trigger rewards based on the score reached
- Format congratulation messages with the score

## Important

- `$getLeaderboardValue` **returns nothing** outside the context of an active leaderboard.
- The function takes **no parameters**.
- It is almost always used with `$getLeaderboardPosition` for a complete display (rank + value).
- The returned value depends on the variable the leaderboard was built on (for example, if the leaderboard is based on `coins`, the value will be the number of coins).

## See Also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Get the rank in the leaderboard
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Global user leaderboard
- [`$serverLeaderboard`](/docs/serverleaderboard) — Server-level leaderboard
- [`$userLeaderboard`](/docs/userleaderboard) — Personal leaderboard
- [`$textSplit`](/docs/textsplit) — Split the result of a leaderboard
