---
layout: doc
title: $getLeaderboardValue[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardValue
syntax: $getLeaderboardValue
description: Returns the value (score, points, etc.) associée to the position courante in the leaderboard actif.
---

# $getLeaderboardValue

The function `$getLeaderboardValue` retourne the value associée to the position courante in the leaderboard actif. Cela can be un score, un number of pièces, points of XP, or toute autre variable on laquelle le classement est basé.

This function n'a of sens **que in the context of itération of un leaderboard** — it is-à-dire after avoir callé `$globalUserLeaderboard`, `$serverLeaderboard` or `$userLeaderboard` and lors of the parcours of their results with `$textSplit`.

## Functionnement

During l'itération of un leaderboard, each entrée contains un identifier (user) and une value (le score). `$getLeaderboardValue` expose cette value for the entrée in progress of traitement.

The value retournée correspond to the variable internal `((leaderboard.value))` qui est resolvede to the runtime par l'action leaderboard dédiée.

## Cas of usage

- Display le score of each joueur in a classement
- Comparer values between differentes positions
- Déclencher récompenses basées on the score atteint
- Formater messages of félicitations with the score

## Important

- `$getLeaderboardValue` **returns nothing** outside the context of un leaderboard actif.
- The function ne prend **no parameter**.
- Elle est presque toudays utilisée with `$getLeaderboardPosition` for a affichage complete (rang + value).
- The value retournée dépend of the variable on laquelle le leaderboard was construit (for example, if the leaderboard est basé on `coins`, the value sera the namebre of pièces).

## Voir also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Obtenir le rang in the classement
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global users
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement to the level of the server
- [`$userLeaderboard`](/docs/userleaderboard) — Classement personnel
- [`$textSplit`](/docs/textsplit) — Découper the result of un leaderboard
