---
layout: doc
title: $userLeaderboard[]
translation_key: docs
category: "Variables"
function_name: userLeaderboard
syntax: $userLeaderboard[variable] or $userLeaderboard[variable;sort]
description: Displays the position of the user courant in a classement basé on a variable, with thes users proches.
---

# $userLeaderboard

The function `$userLeaderboard` displays the position of l'**user courant** in a classement, entouré users qui le précèdent and le suivent immédiatement. Contrairement to `$globalUserLeaderboard` or `$serverLeaderboard` qui retournent le classement complete, this function se concbetween on the context immédiat of the user.

## Syntax

```
$userLeaderboard[variable]
$userLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable to classer |
| `sort` | No | `desc` (décroissant, default) or `asc` (croissant) |

## Functionnement

1. `$userLeaderboard` est un **placeholder** resolved to the runtime par l'action leaderboard.
2. The système identifie the position of the user courant in the classement.
3. Il retourne un voisinage autour of cette position (the user + quelques voisins au-dessus and en dessous).
4. The user courant est identifiable par son nom of user or son ID in thes lignes retournées.

## Utilisation typique

```
$textSplit[$userLeaderboard[score;desc];\n]
```

Puis parcours entrées with `$splitText`, `$getLeaderboardPosition` and `$getLeaderboardValue`.

## Cas of usage

- 📊 **Array of bord personnel** : montrer to the user où il se situe
- 🎯 **Motivation** : display thes voisins directs pour encourager la compétition
- 🏆 **Messages of félicitations** : détecter si the user est on the podium
- 📈 **Suivi of progression** : voir l'ébecauset with thes joueurs devant soi

## Compareason with thes autres leaderboards

| Function | Périmètre | Returns |
|----------|-----------|----------|
| `$userLeaderboard` | User courant | Voisinage autour of the user |
| `$serverLeaderboard` | Server courant | Classement complete of the server |
| `$globalUserLeaderboard` | Tous les users | Classement global complete |

## Notes importantes

- The user doit avoir une value définie for the variable spécifiée, otherwise il n'apparaîtra pas in the classement.
- The namebre of entrées retournées autour of the user dépend of la configuration of the bot.
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
