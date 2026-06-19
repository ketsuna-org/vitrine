---
layout: doc
title: $globalUserLeaderboard[]
translation_key: docs
category: "Variables"
function_name: globalUserLeaderboard
syntax: $globalUserLeaderboard[variable] ou $globalUserLeaderboard[variable;sort]
description: Génère un classement global de tous les utilisateurs basé sur une variable, trié par ordre décroissant par défaut.
parameters:
  - name: variable
    type: string
    required: true
    description: Nom de la variable globale utilisateur sur laquelle baser le classement (ex: score, coins, xp).
  - name: sort
    type: string
    required: false
    description: Direction du tri. "desc" pour décroissant (défaut) ou "asc" pour croissant.
returns:
  type: text
  description: Un placeholder ((globalUserLeaderboard[$variable;$sort])) résolu au runtime en tableau de classement, généralement parsé avec $textSplit.
related:
  - getLeaderboardPosition
  - getLeaderboardValue
  - serverLeaderboard
  - userLeaderboard
  - textSplit
  - setUserVar
  - getUserVar
examples:
  - title: Afficher le top 5 des scores globaux
    code: |
      $textSplit[$globalUserLeaderboard[score;desc];\n]
      $var[i;0]
      $description[🏆 **Top 5 Global**]
      $repeat[5;
        $var[i;$sum[$var[i];1]]
        $description[$getLeaderboardPosition. $splitText[$var[i]] — $getLeaderboardValue pts]
      ]
  - title: Classement des pièces par ordre croissant
    code: |
      $textSplit[$globalUserLeaderboard[coins;asc];\n]
      $var[i;0]
      $description[📊 **Classement Pièces (croissant)**]
      $repeat[10;
        $var[i;$sum[$var[i];1]]
        $description[$getLeaderboardPosition. $splitText[$var[i]] : $getLeaderboardValue 🪙]
      ]
  - title: Trouver le rang de l'utilisateur courant
    code: |
      $textSplit[$globalUserLeaderboard[level;desc];\n]
      $if[$splitText[1]==$username;
        $description[Vous êtes classé 1er ! 🎉]
      ;
        $description[Vous n'êtes pas en tête du classement.]
      ]
---

# $globalUserLeaderboard

La fonction `$globalUserLeaderboard` génère un classement global de tous les utilisateurs du bot, basé sur les valeurs d'une variable utilisateur. C'est l'outil principal pour créer des classements inter-serveurs et motiver la compétition entre utilisateurs.

## Syntaxe

```
$globalUserLeaderboard[variable]
$globalUserLeaderboard[variable;sort]
```

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `variable` | Oui | Le nom de la variable globale utilisateur à classer |
| `sort` | Non | `desc` (décroissant, défaut) ou `asc` (croissant) |

## Fonctionnement

1. `$globalUserLeaderboard` est un **placeholder** : il est remplacé au runtime par l'action leaderboard dédiée.
2. Le système parcourt les variables globales de **tous les utilisateurs** du bot.
3. Les entrées sont triées selon la direction spécifiée.
4. Le résultat est une chaîne multiligne où chaque ligne représente une entrée du classement.

Le format de chaque ligne est typiquement :
```
nomutilisateur
```
Ou potentiellement un format combiné selon la configuration du bot.

## Utilisation typique

Le pattern classique pour exploiter un leaderboard :

```
$textSplit[$globalUserLeaderboard[score;desc];\n]
```

Puis on parcourt les éléments avec `$splitText[index]`, `$getLeaderboardPosition` et `$getLeaderboardValue`.

## Persistance des données

Pour que le classement soit pertinent, les variables utilisateur doivent être alimentées au préalable via :

- [`$setUserVar`](/docs/setuservar) — Définir une variable pour un utilisateur
- [`$getUserVar`](/docs/getuservar) — Lire une variable utilisateur

Exemple de mise à jour de score :
```
$setUserVar[score;$sum[$getUserVar[score];10];$authorID]
```

## Tri

- **`desc`** (par défaut) : les plus grandes valeurs en premier — idéal pour les scores, XP, pièces.
- **`asc`** : les plus petites valeurs en premier — utile pour les temps, les pénalités, ou les classements inversés.

## Notes importantes

- Les utilisateurs qui n'ont pas la variable spécifiée sont ignorés du classement.
- Le nombre d'entrées retournées dépend de la configuration du bot et de l'action leaderboard.
- Pour un classement limité à un serveur spécifique, utilisez [`$serverLeaderboard`](/docs/serverleaderboard).
- Pour voir uniquement la position de l'utilisateur courant, utilisez [`$userLeaderboard`](/docs/userleaderboard).

## Voir aussi

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rang dans le classement actif
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Valeur dans le classement actif
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement limité au serveur
- [`$userLeaderboard`](/docs/userleaderboard) — Position de l'utilisateur courant
- [`$textSplit`](/docs/textsplit) — Parser le résultat
- [`$setUserVar`](/docs/setuservar) — Définir une variable utilisateur
