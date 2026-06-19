---
layout: doc
title: $getLeaderboardPosition[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardPosition
syntax: $getLeaderboardPosition
description: Returns the position of the user in the classement courant during l'itération of un leaderboard.
---

# $getLeaderboardPosition

The function `$getLeaderboardPosition` allows récupérer the position (le rang) of the user in progress in the leaderboard actif. This function n'a of sens **que in the context of itération of un leaderboard** — it is-à-dire after avoir callé `$globalUserLeaderboard`, `$serverLeaderboard` or `$userLeaderboard` and lors of the parcours of their results.

## Functionnement

Lorsque vous utilisez un leaderboard, le système parcourt each entrée une par une. Pendant cette itération, `$getLeaderboardPosition` expose le rang current (1 for the first, 2 for the twoième, etc.).

The value retournée correspond to the variable internal `((leaderboard.position))` qui est resolvede to the runtime par l'action leaderboard dédiée.

## Cas of usage

Typiquement, vous utilisez `$getLeaderboardPosition` with `$textSplit` pour découper the result of the leaderboard ligne par ligne, then display thes positions :

- Display un classement formatted with thes rangs
- Comparer the position of the user courant with celle autres
- Construire messages customs according to the rang (podium, top 10, etc.)

## Important

- `$getLeaderboardPosition` **returns nothing** outside the context of un leaderboard actif.
- The function ne prend **no parameter**.
- Elle est typiquement couplée with `$getLeaderboardValue` qui donne the value associée to cette position.
- Le leaderboard lui-même est generated par une action dédiée at the time of l'exécution of the code.

## Voir also

- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Obtenir the value associée to the position courante
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global users
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement to the level of the server
- [`$userLeaderboard`](/docs/userleaderboard) — Classement personnel
- [`$textSplit`](/docs/textsplit) — Découper the result of un leaderboard
