---
layout: doc
title: $userLeaderboard[]
translation_key: docs
category: "Variables"
function_name: userLeaderboard
syntax: $userLeaderboard[variable] ou $userLeaderboard[variable;sort]
description: Affiche la position de l'utilisateur courant dans un classement basé sur une variable, avec les utilisateurs proches.
parameters:
  - name: variable
    type: string
    required: true
    description: Nom de la variable sur laquelle baser le classement (ex: score, level, balance).
  - name: sort
    type: string
    required: false
    description: Direction du tri. "desc" pour décroissant (défaut) ou "asc" pour croissant.
returns:
  type: text
  description: Un placeholder ((userLeaderboard[$variable;$sort])) résolu au runtime montrant la position de l'utilisateur et ses voisins dans le classement.
related:
  - getLeaderboardPosition
  - getLeaderboardValue
  - globalUserLeaderboard
  - serverLeaderboard
  - textSplit
  - setUserVar
  - getUserVar
examples:
  - title: Voir son classement personnel
    code: |
      $textSplit[$userLeaderboard[score;desc];\n]
      $var[i;0]
      $description[📊 **Votre classement**]
      $repeat[$splitLength;
        $var[i;$sum[$var[i];1]]
        $description[$getLeaderboardPosition. $splitText[$var[i]] — $getLeaderboardValue pts]
      ]
  - title: Message personnalisé selon le rang
    code: |
      $textSplit[$userLeaderboard[level;desc];\n]
      $if[$getLeaderboardPosition==1;
        $description[👑 Vous êtes **1er** du classement niveau ! Félicitations !]
      ;
      $if[$getLeaderboardPosition<=3;
        $description[🥇 Vous êtes sur le podium, rang **#$getLeaderboardPosition** !]
      ;
      $if[$getLeaderboardPosition<=10;
        $description[📈 Vous êtes dans le top 10, rang **#$getLeaderboardPosition** !]
      ;
        $description[📊 Vous êtes classé **#$getLeaderboardPosition** avec $getLeaderboardValue niveaux.]
      ]]]
  - title: Comparaison avec les voisins directs
    code: |
      $textSplit[$userLeaderboard[balance;desc];\n]
      $description[💰 Votre solde : $getUserVar[balance;$authorID] pièces]
      $description[🏦 Classement : #$getLeaderboardPosition]
      $description[📊 Le joueur devant vous a $getLeaderboardValue pièces.]
---

# $userLeaderboard

La fonction `$userLeaderboard` affiche la position de l'**utilisateur courant** dans un classement, entouré des utilisateurs qui le précèdent et le suivent immédiatement. Contrairement à `$globalUserLeaderboard` ou `$serverLeaderboard` qui retournent le classement complet, cette fonction se concentre sur le contexte immédiat de l'utilisateur.

## Syntaxe

```
$userLeaderboard[variable]
$userLeaderboard[variable;sort]
```

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `variable` | Oui | Le nom de la variable à classer |
| `sort` | Non | `desc` (décroissant, défaut) ou `asc` (croissant) |

## Fonctionnement

1. `$userLeaderboard` est un **placeholder** résolu au runtime par l'action leaderboard.
2. Le système identifie la position de l'utilisateur courant dans le classement.
3. Il retourne un voisinage autour de cette position (l'utilisateur + quelques voisins au-dessus et en dessous).
4. L'utilisateur courant est identifiable par son nom d'utilisateur ou son ID dans les lignes retournées.

## Utilisation typique

```
$textSplit[$userLeaderboard[score;desc];\n]
```

Puis parcours des entrées avec `$splitText`, `$getLeaderboardPosition` et `$getLeaderboardValue`.

## Cas d'usage

- 📊 **Tableau de bord personnel** : montrer à l'utilisateur où il se situe
- 🎯 **Motivation** : afficher les voisins directs pour encourager la compétition
- 🏆 **Messages de félicitations** : détecter si l'utilisateur est sur le podium
- 📈 **Suivi de progression** : voir l'écart avec les joueurs devant soi

## Comparaison avec les autres leaderboards

| Fonction | Périmètre | Retourne |
|----------|-----------|----------|
| `$userLeaderboard` | Utilisateur courant | Voisinage autour de l'utilisateur |
| `$serverLeaderboard` | Serveur courant | Classement complet du serveur |
| `$globalUserLeaderboard` | Tous les utilisateurs | Classement global complet |

## Notes importantes

- L'utilisateur doit avoir une valeur définie pour la variable spécifiée, sinon il n'apparaîtra pas dans le classement.
- Le nombre d'entrées retournées autour de l'utilisateur dépend de la configuration du bot.
- `$getLeaderboardPosition` et `$getLeaderboardValue` fonctionnent normalement pendant l'itération.
- Pour un classement complet, préférez `$globalUserLeaderboard` ou `$serverLeaderboard`.

## Voir aussi

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rang dans le classement actif
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Valeur dans le classement actif
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global complet
- [`$serverLeaderboard`](/docs/serverleaderboard) — Classement complet du serveur
- [`$textSplit`](/docs/textsplit) — Parser le résultat
- [`$getUserVar`](/docs/getuservar) — Lire une variable utilisateur
- [`$setUserVar`](/docs/setuservar) — Définir une variable utilisateur
