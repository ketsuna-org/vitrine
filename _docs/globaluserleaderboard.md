---
layout: doc
title: $globalUserLeaderboard[]
translation_key: docs
category: "Variables"
function_name: globalUserLeaderboard
syntax: $globalUserLeaderboard[variable] or $globalUserLeaderboard[variable;sort]
description: Generates a classement global of all users basé on a variable, sorted par ordre décroissant default.
---

# $globalUserLeaderboard

The function `$globalUserLeaderboard` génère un classement global of all users of the bot, basé on the values of a variable user. C'est l'outil principal pour create classements inter-servers and motiver la compétition between users.

## Syntax

```
$globalUserLeaderboard[variable]
$globalUserLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable global user to classer |
| `sort` | No | `desc` (décroissant, default) or `asc` (croissant) |

## Functionnement

1. `$globalUserLeaderboard` est un **placeholder** : it is replaced to the runtime par l'action leaderboard dédiée.
2. The système parcourt les variables globals of **all users** of the bot.
3. The entrées sont sortedes according to the direction spécifiée.
4. The result est une string multiligne où each ligne represents une entrée of the classement.

The format of each ligne est typiquement :
```
nomuser
```
Ou potentiellement un format combiné according to the configuration of the bot.

## Utilisation typique

The pattern classique pour exploiter un leaderboard :

```
$textSplit[$globalUserLeaderboard[score;desc];\n]
```

Puis on parcourt les éléments with `$splitText[index]`, `$getLeaderboardPosition` and `$getLeaderboardValue`.

## Persistance datas

Pour que le classement soit pertinent, les variables user must be alimentées to the préalable via :

- [`$setUserVar`](/docs/setuservar) — Définir une variable for a user
- [`$getUserVar`](/docs/getuservar) — Lire une variable user

Exemple of mise to day of score :
```
$setUserVar[score;$sum[$getUserVar[score];10];$authorID]
```

## Tri

- **`desc`** (default) : les plus grandes values en first — idéal for the scores, XP, pièces.
- **`asc`** : les plus petites values en first — utile for the temps, les pénalités, or les classements reverseds.

## Notes importantes

- Les users qui n'ont pas the variable spécifiée sont ignorés of the classement.
- The namebre of entrées retournées dépend of la configuration of the bot and of l'action leaderboard.
- Pour un classement limité to un server specific, utilisez [`$serverLeaderboard`](/docs/serverleaderboard).
- Pour voir only the position of the user courant, utilisez [`$userLeaderboard`](/docs/userleaderboard).

## Voir also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rang in the classement actif
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Value in the classement actif
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement limité to the server
- [`$userLeaderboard`](/docs/userleaderboard) — Position of the user courant
- [`$textSplit`](/docs/textsplit) — Parser the result
- [`$setUserVar`](/docs/setuservar) — Définir une variable user
