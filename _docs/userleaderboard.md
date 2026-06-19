---
layout: doc
title: $userLeaderboard[]
translation_key: docs
category: "Variables"
function_name: userLeaderboard
syntax: $userLeaderboard[variable] ou $userLeaderboard[variable;sort]
description: Affiche la position de l'utilisateur courant dans un classement basé sur une variable, avec les utilisateurs proches.
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
