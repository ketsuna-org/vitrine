---
layout: doc
title: $serverLeaderboard[]
translation_key: docs
category: "Variables"
function_name: serverLeaderboard
syntax: $serverLeaderboard[variable] or $serverLeaderboard[variable;sort]
description: Generates a classement des users of the server courant basé sur une variable, sorted par ordre décroissant default.
---

# $serverLeaderboard

The function `$serverLeaderboard` génère un classement des users **limité au server Discord courant** (guild). Contrairement à `$globalUserLeaderboard` qui couvre all users of the bot, this function restreint le périmètre aux members of the server où the command est executed.

## Syntax

```
$serverLeaderboard[variable]
$serverLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable à classer (user-scoped or guild-scoped) |
| `sort` | No | `desc` (décroissant, default) or `asc` (croissant) |

## Functionnement

1. `$serverLeaderboard` est un **placeholder** : it is replaced au runtime par l'action leaderboard dédiée.
2. The système ne considère que les variables des users **members of the server courant**.
3. The entrées sont sortedes selon la direction spécifiée.
4. The result est une string multiligne où each ligne represents une entrée du classement.

The format de each ligne est typiquement the name d'user, exploitable via `$textSplit`.

## Utilisation typique

```
$textSplit[$serverLeaderboard[xp;desc];\n]
```

Puis parcours avec `$splitText`, `$getLeaderboardPosition` and `$getLeaderboardValue`.

## Persistance des datas

The variables can be de two types :

- **User-scoped** : propres à each user, définies avec [`$setUserVar`](/docs/setuservar). Example: XP gagné on the server.
- **Guild-scoped** : propres au server, définies avec des functions de variables de server.

Exemple de mise à day d'XP server :
```
$setUserVar[xp;$sum[$getUserVar[xp];$random[10;50]];$authorID]
```

## Tri

- **`desc`** (default) : values les plus élevées en first (XP, messages, pièces).
- **`asc`** : values les plus basses en first (warns, temps, pénalités).

## Cas d'usage courants

- 🎮 **Leaderboard XP** : motiver l'activité on the server
- 💬 **Top messages** : récompenser les members les plus actifs
- 🛡️ **Modération** : surveiller les members with the plus de warns
- 🎯 **Events** : classements temporarys pour des concours

## Notes importantes

- Seuls les members **currents** of the server sont included in the classement.
- Les users qui n'ont pas the variable spécifiée sont ignorés.
- Pour un classement all servers confondus, utilisez [`$globalUserLeaderboard`](/docs/globaluserleaderboard).
- Pour voir the position of a user spécifique, utilisez [`$userLeaderboard`](/docs/userleaderboard).

## Voir also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rang in the classement actif
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Value in the classement actif
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global inter-servers
- [`$userLeaderboard`](/docs/userleaderboard) — Position of the user courant
- [`$textSplit`](/docs/textsplit) — Parser the result
- [`$setUserVar`](/docs/setuservar) — Définir une variable user
