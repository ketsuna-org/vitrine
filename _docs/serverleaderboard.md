---
layout: doc
title: $serverLeaderboard[]
translation_key: docs
category: "Variables"
function_name: serverLeaderboard
syntax: $serverLeaderboard[variable] or $serverLeaderboard[variable;sort]
description: Generates a classement users of the server courant basé on a variable, sorted par ordre décroissant default.
---

# $serverLeaderboard

The function `$serverLeaderboard` génère un classement users **limité to the server Discord courant** (guild). Contrairement to `$globalUserLeaderboard` qui couvre all users of the bot, this function restreint le périmètre to the members of the server où the command est executed.

## Syntax

```
$serverLeaderboard[variable]
$serverLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable to classer (user-scoped or guild-scoped) |
| `sort` | No | `desc` (décroissant, default) or `asc` (croissant) |

## Functionnement

1. `$serverLeaderboard` est un **placeholder** : it is replaced to the runtime par l'action leaderboard dédiée.
2. The système ne considère que les variables users **members of the server courant**.
3. The entrées sont sortedes according to the direction spécifiée.
4. The result est une string multiligne où each ligne represents une entrée of the classement.

The format of each ligne est typiquement the name of user, exploitable via `$textSplit`.

## Utilisation typique

```
$textSplit[$serverLeaderboard[xp;desc];\n]
```

Puis parcours with `$splitText`, `$getLeaderboardPosition` and `$getLeaderboardValue`.

## Persistance datas

The variables can be of two types :

- **User-scoped** : propres to each user, définies with [`$setUserVar`](/docs/setuservar). Example: XP gagné on the server.
- **Guild-scoped** : propres to the server, définies with functions of variables of server.

Exemple of mise to day of XP server :
```
$setUserVar[xp;$sum[$getUserVar[xp];$random[10;50]];$authorID]
```

## Tri

- **`desc`** (default) : values les plus élevées en first (XP, messages, pièces).
- **`asc`** : values les plus basses en first (warns, temps, pénalités).

## Cas of usage courants

- 🎮 **Leaderboard XP** : motiver l'activité on the server
- 💬 **Top messages** : récompenser les members les plus actifs
- 🛡️ **Modération** : surveiller les members with the plus of warns
- 🎯 **Events** : classements temporarys pour concours

## Notes importantes

- Seuls les members **currents** of the server sont included in the classement.
- Les users qui n'ont pas the variable spécifiée sont ignorés.
- Pour un classement all servers confondus, utilisez [`$globalUserLeaderboard`](/docs/globaluserleaderboard).
- Pour voir the position of a user specific, utilisez [`$userLeaderboard`](/docs/userleaderboard).

## Voir also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rang in the classement actif
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Value in the classement actif
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global inter-servers
- [`$userLeaderboard`](/docs/userleaderboard) — Position of the user courant
- [`$textSplit`](/docs/textsplit) — Parser the result
- [`$setUserVar`](/docs/setuservar) — Définir une variable user
