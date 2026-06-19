---
layout: doc
title: $getLeaderboardValue[]
translation_key: docs
category: "Variables"
function_name: getLeaderboardValue
syntax: $getLeaderboardValue
description: Retourne la valeur (score, points, etc.) associée à la position courante dans le leaderboard actif.
---

# $getLeaderboardValue

La fonction `$getLeaderboardValue` retourne la valeur associée à la position courante dans le leaderboard actif. Cela peut être un score, un nombre de pièces, des points d'XP, ou toute autre variable sur laquelle le classement est basé.

Cette fonction n'a de sens **que dans le contexte d'itération d'un leaderboard** — c'est-à-dire après avoir appelé `$globalUserLeaderboard`, `$serverLeaderboard` ou `$userLeaderboard` et lors du parcours de ses résultats avec `$textSplit`.

## Fonctionnement

Lors de l'itération d'un leaderboard, chaque entrée contient un identifiant (utilisateur) et une valeur (le score). `$getLeaderboardValue` expose cette valeur pour l'entrée en cours de traitement.

La valeur retournée correspond à la variable interne `((leaderboard.value))` qui est résolue au runtime par l'action leaderboard dédiée.

## Cas d'usage

- Afficher le score de chaque joueur dans un classement
- Comparer des valeurs entre différentes positions
- Déclencher des récompenses basées sur le score atteint
- Formater des messages de félicitations avec le score

## Important

- `$getLeaderboardValue` **ne retourne rien** en dehors du contexte d'un leaderboard actif.
- La fonction ne prend **aucun paramètre**.
- Elle est presque toujours utilisée avec `$getLeaderboardPosition` pour un affichage complet (rang + valeur).
- La valeur retournée dépend de la variable sur laquelle le leaderboard a été construit (par exemple, si le leaderboard est basé sur `coins`, la valeur sera le nombre de pièces).

## Voir aussi

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Obtenir le rang dans le classement
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global des utilisateurs
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement au niveau du serveur
- [`$userLeaderboard`](/docs/userleaderboard) — Classement personnel
- [`$textSplit`](/docs/textsplit) — Découper le résultat d'un leaderboard
