---
layout: doc
title: $getLeaderboardPosition[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardPosition
syntax: $getLeaderboardPosition
description: Returns the position of the user in the classement courant during l'itération d'un leaderboard.
---

# $getLeaderboardPosition

The function `$getLeaderboardPosition` allows récupérer the position (le rang) of the user in progress in the leaderboard actif. This function n'a de sens **que in the context d'itération d'un leaderboard** — it is-à-dire after avoir callé `$globalUserLeaderboard`, `$serverLeaderboard` or `$userLeaderboard` and lors du parcours de their results.

## Functionnement

Lorsque vous utilisez un leaderboard, le système parcourt each entrée une par une. Pendant cette itération, `$getLeaderboardPosition` expose le rang current (1 for the first, 2 for the twoième, etc.).

The value retournée correspond à the variable internal `((leaderboard.position))` qui est resolvede au runtime par l'action leaderboard dédiée.

## Cas d'usage

Typiquement, vous utilisez `$getLeaderboardPosition` avec `$textSplit` pour découper the result du leaderboard ligne par ligne, then afficher les positions :

- Afficher un classement formatted with thes rangs
- Comparer the position of the user courant avec celle des autres
- Construire des messages customs selon le rang (podium, top 10, etc.)

## Important

- `$getLeaderboardPosition` **returns nothing** outside the context d'un leaderboard actif.
- The function ne prend **no parameter**.
- Elle est typiquement couplée avec `$getLeaderboardValue` qui donne the value associée à cette position.
- Le leaderboard lui-même est generated par une action dédiée at the time of l'exécution du code.

## Voir also

- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Obtenir the value associée à the position courante
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global des users
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement au level of the server
- [`$userLeaderboard`](/docs/userleaderboard) — Classement personnel
- [`$textSplit`](/docs/textsplit) — Découper the result d'un leaderboard
