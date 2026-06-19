---
layout: doc
title: $globalUserLeaderboard[]
translation_key: docs
category: "Variables"
function_name: globalUserLeaderboard
syntax: $globalUserLeaderboard[variable] or $globalUserLeaderboard[variable;sort]
description: Generates a classement global de all users basé sur une variable, sorted par ordre décroissant default.
---

# $globalUserLeaderboard

The function `$globalUserLeaderboard` génère un classement global de all users of the bot, basé sur les values of a variable user. C'est l'outil principal pour créer des classements inter-servers and motiver la compétition between users.

## Syntax

```
$globalUserLeaderboard[variable]
$globalUserLeaderboard[variable;sort]
```

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `variable` | Yes | The name of the variable global user à classer |
| `sort` | No | `desc` (décroissant, default) or `asc` (croissant) |

## Functionnement

1. `$globalUserLeaderboard` est un **placeholder** : it is replaced au runtime par l'action leaderboard dédiée.
2. The système parcourt les variables globals de **all users** of the bot.
3. The entrées sont sortedes selon la direction spécifiée.
4. The result est une string multiligne où each ligne represents une entrée du classement.

The format de each ligne est typiquement :
```
nomuser
```
Ou potentiellement un format combiné selon la configuration of the bot.

## Utilisation typique

The pattern classique pour exploiter un leaderboard :

```
$textSplit[$globalUserLeaderboard[score;desc];\n]
```

Puis on parcourt les éléments avec `$splitText[index]`, `$getLeaderboardPosition` and `$getLeaderboardValue`.

## Persistance des datas

Pour que le classement soit pertinent, les variables user must be alimentées au préalable via :

- [`$setUserVar`](/docs/setuservar) — Définir une variable for a user
- [`$getUserVar`](/docs/getuservar) — Lire une variable user

Exemple de mise à day de score :
```
$setUserVar[score;$sum[$getUserVar[score];10];$authorID]
```

## Tri

- **`desc`** (default) : les plus grandes values en first — idéal for the scores, XP, pièces.
- **`asc`** : les plus petites values en first — utile for the temps, les pénalités, or les classements reverseds.

## Notes importantes

- Les users qui n'ont pas the variable spécifiée sont ignorés du classement.
- The namebre d'entrées retournées dépend de la configuration of the bot and de l'action leaderboard.
- Pour un classement limité à un server spécifique, utilisez [`$serverLeaderboard`](/docs/serverleaderboard).
- Pour voir only the position of the user courant, utilisez [`$userLeaderboard`](/docs/userleaderboard).

## Voir also

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rang in the classement actif
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Value in the classement actif
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement limité au server
- [`$userLeaderboard`](/docs/userleaderboard) — Position of the user courant
- [`$textSplit`](/docs/textsplit) — Parser the result
- [`$setUserVar`](/docs/setuservar) — Définir une variable user
