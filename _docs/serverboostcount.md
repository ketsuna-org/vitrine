---
layout: doc
title: $serverBoostCount[]
translation_key: docs
category: "Entity Info"
function_name: serverBoostCount
syntax: $serverBoostCount
description: Retourne le nombre de boosts Nitro actifs sur le serveur Discord.
parameters: []
returns:
  type: integer
  description: Le nombre de boosts serveur (Nitro Boosts).
related:
  - $boostLevel
  - $serverInfo
  - $membersCount
examples:
  - description: Afficher le nombre de boosts
    code: |
      $sendMessage[🚀 Ce serveur a $serverBoostCount boosts !]
  - description: Embed info serveur
    code: |
      $title[$serverName]
      $addField[Boosts;$serverBoostCount;yes]
      $addField[Niveau de boost;$boostLevel;yes]
      $color[#F47FFF]
      $sendEmbedMessage
---

# $serverBoostCount[] — Nombre de Boosts du Serveur

`$serverBoostCount[]` retourne le nombre total de boosts Nitro appliqués au serveur. Les boosts permettent de débloquer des avantages pour le serveur (plus d'émojis, meilleure qualité audio, bannière, etc.).

## Syntaxe

```
$serverBoostCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre de boosts Nitro actifs sur le serveur.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🚀 **$serverBoostCount** boosts Nitro sur ce serveur !]
```

### Embed de remerciement

```bdfd
$title[🚀 Boosters de $serverName]
$description[Merci aux $serverBoostCount boosters qui soutiennent le serveur !]
$addField[Niveau actuel;$boostLevel;yes]
$addField[Prochain palier;$if[$boostLevel<3]Plus que $sub[$var[boostsNeeded];$serverBoostCount] boosts !$elseNiveau maximum atteint 🎉$endif;yes]
$color[#F47FFF]
$sendEmbedMessage
```

### Info serveur complète

```bdfd
$title[📊 Statistiques de $serverName]
$addField[👥 Membres;$membersCount;yes]
$addField[🟢 En ligne;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🚀 Boosts;$serverBoostCount (Niveau $boostLevel);yes]
$addField[🎨 Émojis;$emojiCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Condition d'encouragement

```bdfd
$if[$serverBoostCount>=14]
$sendMessage[🌟 Niveau 3 atteint ! Profitez de tous les avantages.]
$elseIf[$serverBoostCount>=7]
$sendMessage[🎈 Niveau 2 ! Plus que $sub[14;$serverBoostCount] boosts pour le niveau 3.]
$elseIf[$serverBoostCount>=2]
$sendMessage[🎀 Niveau 1 ! Plus que $sub[7;$serverBoostCount] boosts pour le niveau 2.]
$else
$sendMessage[💪 Aucun niveau de boost. $sub[2;$serverBoostCount] boosts requis pour le niveau 1.]
$endif
```

## Notes

- Chaque boost compte pour 1, peu importe qui l'a appliqué.
- Le nombre de boosts détermine le niveau de boost du serveur :
  - Niveau 1 : 2 boosts
  - Niveau 2 : 7 boosts
  - Niveau 3 : 14 boosts
- Utilisez `$boostLevel[]` pour obtenir directement le niveau (0-3) sans calculer les paliers.
