---
layout: doc
title: $serverLeaderboard[]
translation_key: docs
category: "Variables"
function_name: serverLeaderboard
syntax: $serverLeaderboard[variable] ou $serverLeaderboard[variable;sort]
description: Génère un classement des utilisateurs du serveur courant basé sur une variable, trié par ordre décroissant par défaut.
---

# $serverLeaderboard

La fonction `$serverLeaderboard` génère un classement des utilisateurs **limité au serveur Discord courant** (guild). Contrairement à `$globalUserLeaderboard` qui couvre tous les utilisateurs du bot, cette fonction restreint le périmètre aux membres du serveur où la commande est exécutée.

## Syntaxe

```
$serverLeaderboard[variable]
$serverLeaderboard[variable;sort]
```

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `variable` | Oui | Le nom de la variable à classer (user-scoped ou guild-scoped) |
| `sort` | Non | `desc` (décroissant, défaut) ou `asc` (croissant) |

## Fonctionnement

1. `$serverLeaderboard` est un **placeholder** : il est remplacé au runtime par l'action leaderboard dédiée.
2. Le système ne considère que les variables des utilisateurs **membres du serveur courant**.
3. Les entrées sont triées selon la direction spécifiée.
4. Le résultat est une chaîne multiligne où chaque ligne représente une entrée du classement.

Le format de chaque ligne est typiquement le nom d'utilisateur, exploitable via `$textSplit`.

## Utilisation typique

```
$textSplit[$serverLeaderboard[xp;desc];\n]
```

Puis parcours avec `$splitText`, `$getLeaderboardPosition` et `$getLeaderboardValue`.

## Persistance des données

Les variables peuvent être de deux types :

- **User-scoped** : propres à chaque utilisateur, définies avec [`$setUserVar`](/docs/setuservar). Exemple : XP gagné sur le serveur.
- **Guild-scoped** : propres au serveur, définies avec des fonctions de variables de serveur.

Exemple de mise à jour d'XP serveur :
```
$setUserVar[xp;$sum[$getUserVar[xp];$random[10;50]];$authorID]
```

## Tri

- **`desc`** (défaut) : valeurs les plus élevées en premier (XP, messages, pièces).
- **`asc`** : valeurs les plus basses en premier (warns, temps, pénalités).

## Cas d'usage courants

- 🎮 **Leaderboard XP** : motiver l'activité sur le serveur
- 💬 **Top messages** : récompenser les membres les plus actifs
- 🛡️ **Modération** : surveiller les membres avec le plus de warns
- 🎯 **Événements** : classements temporaires pour des concours

## Notes importantes

- Seuls les membres **actuels** du serveur sont inclus dans le classement.
- Les utilisateurs qui n'ont pas la variable spécifiée sont ignorés.
- Pour un classement tous serveurs confondus, utilisez [`$globalUserLeaderboard`](/docs/globaluserleaderboard).
- Pour voir la position d'un utilisateur spécifique, utilisez [`$userLeaderboard`](/docs/userleaderboard).

## Voir aussi

- [`$getLeaderboardPosition`](/docs/getleaderboardposition) — Rang dans le classement actif
- [`$getLeaderboardValue`](/docs/getleaderboardvalue) — Valeur dans le classement actif
- [`$globalUserLeaderboard`](/docs/globaluserleaderboard) — Classement global inter-serveurs
- [`$userLeaderboard`](/docs/userleaderboard) — Position de l'utilisateur courant
- [`$textSplit`](/docs/textsplit) — Parser le résultat
- [`$setUserVar`](/docs/setuservar) — Définir une variable utilisateur
