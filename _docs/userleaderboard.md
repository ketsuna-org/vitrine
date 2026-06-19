---
layout: doc
title: $userLeaderboard[]
translation_key: docs
category: "Variables"
function_name: userLeaderboard
syntax: $userLeaderboard[variable] or $userLeaderboard[variable;sort]
description: Displays the position of the user courant dans un classement basé sur une variable, with thes users proches.
---

# $userLeaderboard

The function `$userLeaderboard` displays the position de l'**user courant** dans un classement, entouré des users qui le précèdent and le suivent immédiatement. Contrairement à `$globalUserLeaderboard` or `$serverLeaderboard` qui retournent le classement complete, this function se concbetween sur le context immédiat of the user.

## Syntax

```
$userLeaderboard[variable]
$userLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable à classer |
| `sort` | No | `desc` (décroissant, default) or `asc` (croissant) |

## Functionnement

1. `$userLeaderboard` est un **placeholder** resolved au runtime par l'action leaderboard.
2. The système identifie the position of the user courant in the classement.
3. Il retourne un voisinage autour de cette position (the user + quelques voisins au-dessus and en dessous).
4. The user courant est identifiable par son nom d'user or son ID in thes lignes retournées.

## Utilisation typique

```
$textSplit[$userLeaderboard[score;desc];\n]
```

Puis parcours des entrées avec `$splitText`, `$getLeaderboardPosition` and `$getLeaderboardValue`.

## Cas d'usage

- 📊 **Array de bord personnel** : montrer à the user où il se situe
- 🎯 **Motivation** : afficher les voisins directs pour encourager la compétition
- 🏆 **Messages de félicitations** : détecter si the user est sur le podium
- 📈 **Suivi de progression** : voir l'ébecauset with thes joueurs devant soi

## Compareason with thes autres leaderboards

| Function | Périmètre | Returns |
|----------|-----------|----------|
| `$userLeaderboard` | User courant | Voisinage autour of the user |
| `$serverLeaderboard` | Server courant | Classement complete of the server |
| `$globalUserLeaderboard` | Tous les users | Classement global complete |

## Notes importantes

- The user doit avoir une value définie for the variable spécifiée, otherwise il n'apparaîtra pas in the classement.
- The namebre d'entrées retournées autour of the user dépend de la configuration of the bot.
- `$getLeaderboardPosition` and `$getLeaderboardValue` functionnent normalement during l'itération.
- Pour un classement complete, préférez `$globalUserLeaderboard` or `$serverLeaderboard`.

## Voir also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rang in the classement actif
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Value in the classement actif
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global complete
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement complete of the server
- [`$textSplit`](/docs/textsplit) — Parser the result
- [`$getUserVar`](/docs/getuservar) — Lire une variable user
- [`$setUserVar`](/docs/setuservar) — Définir une variable user
