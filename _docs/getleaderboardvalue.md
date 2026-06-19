---
layout: doc
title: $getLeaderboardValue[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardValue
syntax: $getLeaderboardValue
description: Returns the value (score, points, etc.) associée à the position courante in the leaderboard actif.
---

# $getLeaderboardValue

The function `$getLeaderboardValue` retourne the value associée à the position courante in the leaderboard actif. Cela can be un score, un number de pièces, des points d'XP, or toute autre variable sur laquelle le classement est basé.

This function n'a de sens **que in the context d'itération d'un leaderboard** — it is-à-dire after avoir callé `$globalUserLeaderboard`, `$serverLeaderboard` or `$userLeaderboard` and lors du parcours de their results avec `$textSplit`.

## Functionnement

During l'itération d'un leaderboard, each entrée contains un identifier (user) and une value (le score). `$getLeaderboardValue` expose cette value for the entrée in progress de traitement.

The value retournée correspond à the variable internal `((leaderboard.value))` qui est resolvede au runtime par l'action leaderboard dédiée.

## Cas d'usage

- Afficher le score de each joueur dans un classement
- Comparer des values between differentes positions
- Déclencher des récompenses basées sur le score atteint
- Formater des messages de félicitations with the score

## Important

- `$getLeaderboardValue` **returns nothing** outside the context d'un leaderboard actif.
- The function ne prend **no parameter**.
- Elle est presque toudays utilisée avec `$getLeaderboardPosition` for a affichage complete (rang + value).
- The value retournée dépend of the variable sur laquelle le leaderboard was construit (for example, if the leaderboard est basé sur `coins`, the value sera the namebre de pièces).

## Voir also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Obtenir le rang in the classement
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global des users
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement au level of the server
- [`$userLeaderboard`](/docs/userleaderboard) — Classement personnel
- [`$textSplit`](/docs/textsplit) — Découper the result d'un leaderboard
