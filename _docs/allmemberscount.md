---
layout: doc
title: $allMembersCount
translation_key: docs
category: "Entity Info"
function_name: allMembersCount
syntax: $allMembersCount
description: Retourne le nombre total de membres sur le serveur (incluant les bots). Contrairement à $membersCount, cette fonction compte également les bots.
---

# $allMembersCount

La fonction `$allMembersCount` permet de **récupérer le nombre total de membres** sur le serveur, en incluant les bots.

## Syntaxe

```
$allMembersCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : String (nombre)
- Le nombre total de membres (utilisateurs + bots) présents sur le serveur.

## Comportement

- Compte tous les membres du serveur, y compris les bots.
- Diffère de `$membersCount` qui ne compte que les utilisateurs humains.
- La valeur est mise à jour en temps réel.

## Exemples

### Affichage simple

```bdfd
$title[📊 Statistiques du serveur]
$description[
**Membres totaux :** $allMembersCount
**Humains :** $membersCount
**Bots :** $botCount
]
$color[#5865F2]
$sendMessage[]
```

### Comparaison humains vs bots

```bdfd
$let[humans;$membersCount]
$let[bots;$botCount]
$let[total;$allMembersCount]

$title[👥 Composition du serveur]
$description[
**Total :** $total membres
**👤 Humains :** $humans ($math[$humans*100/$total]%)
**🤖 Bots :** $bots ($math[$bots*100/$total]%)
]
$color[#57F287]
$sendMessage[]
```

### Compteur de bienvenue

```bdfd
$title[🎉 Bienvenue sur $serverName !]
$description[
Tu es le **$allMembersCountᵉ** membre du serveur !
]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[$channelID[bienvenue]]
```

## Notes

- N'inclut que les membres encore présents sur le serveur.
- Pour avoir uniquement les humains, utilisez `$membersCount`.
- Pour avoir uniquement les bots, utilisez `$botCount`.
