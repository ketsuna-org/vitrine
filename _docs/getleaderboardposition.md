---
layout: doc
title: $getLeaderboardPosition[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardPosition
syntax: $getLeaderboardPosition
description: Retourne la position de l'utilisateur dans le classement courant lors de l'itération d'un leaderboard.
---

# $getLeaderboardPosition

La fonction `$getLeaderboardPosition` permet de récupérer la position (le rang) de l'utilisateur en cours dans le leaderboard actif. Cette fonction n'a de sens **que dans le contexte d'itération d'un leaderboard** — c'est-à-dire après avoir appelé `$globalUserLeaderboard`, `$serverLeaderboard` ou `$userLeaderboard` et lors du parcours de ses résultats.

## Fonctionnement

Lorsque vous utilisez un leaderboard, le système parcourt chaque entrée une par une. Pendant cette itération, `$getLeaderboardPosition` expose le rang actuel (1 pour le premier, 2 pour le deuxième, etc.).

La valeur retournée correspond à la variable interne `((leaderboard.position))` qui est résolue au runtime par l'action leaderboard dédiée.

## Cas d'usage

Typiquement, vous utilisez `$getLeaderboardPosition` avec `$textSplit` pour découper le résultat du leaderboard ligne par ligne, puis afficher les positions :

- Afficher un classement formaté avec les rangs
- Comparer la position de l'utilisateur courant avec celle des autres
- Construire des messages personnalisés selon le rang (podium, top 10, etc.)

## Important

- `$getLeaderboardPosition` **ne retourne rien** en dehors du contexte d'un leaderboard actif.
- La fonction ne prend **aucun paramètre**.
- Elle est typiquement couplée avec `$getLeaderboardValue` qui donne la valeur associée à cette position.
- Le leaderboard lui-même est généré par une action dédiée au moment de l'exécution du code.

## Voir aussi

- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Obtenir la valeur associée à la position courante
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global des utilisateurs
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement au niveau du serveur
- [`$userLeaderboard`](/docs/userleaderboard) — Classement personnel
- [`$textSplit`](/docs/textsplit) — Découper le résultat d'un leaderboard
