---
layout: doc
title: $serverBoostCount[]
translation_key: docs
category: "Entity Info"
function_name: serverBoostCount
syntax: $serverBoostCount
description: Returns the number de boosts Nitro actifs on the server Discord.
---

# $serverBoostCount[] — Number de Boosts du Server

`$serverBoostCount[]` retourne the namebre total de boosts Nitro appliqués au server. The boosts permettent de débloquer des beforeages for the server (plus d'emojis, meilleure qualité audio, banner, etc.).

## Syntax

```
$serverBoostCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre de boosts Nitro actifs on the server.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🚀 **$serverBoostCount** boosts Nitro sur ce server !]
```

### Embed de remerciement

```bdfd
$title[🚀 Boosters de $serverName]
$description[Merci aux $serverBoostCount boosters qui soutiennent the server !]
$addField[Level current;$boostLevel;yes]
$addField[Prochain palier;$if[$boostLevel<3]Plus que $sub[$var[boostsNeeded];$serverBoostCount] boosts !$elseLevel maximum atteint 🎉$endif;yes]
$color[#F47FFF]
$sendEmbedMessage
```

### Info server complete

```bdfd
$title[📊 Statistiques de $serverName]
$addField[👥 Members;$membersCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🚀 Boosts;$serverBoostCount (Level $boostLevel);yes]
$addField[🎨 Emojis;$emojiCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Condition d'encouragement

```bdfd
$if[$serverBoostCount>=14]
$sendMessage[🌟 Level 3 atteint ! Profitez de all beforeages.]
$elseIf[$serverBoostCount>=7]
$sendMessage[🎈 Level 2 ! Plus que $sub[14;$serverBoostCount] boosts for the level 3.]
$elseIf[$serverBoostCount>=2]
$sendMessage[🎀 Level 1 ! Plus que $sub[7;$serverBoostCount] boosts for the level 2.]
$else
$sendMessage[💪 Aucun level de boost. $sub[2;$serverBoostCount] boosts required for the level 1.]
$endif
```

## Notes

- Chaque boost compte pour 1, peu importe qui l'a appliqué.
- The namebre de boosts détermine le level de boost of the server :
  - Level 1 : 2 boosts
  - Level 2 : 7 boosts
  - Level 3 : 14 boosts
- Utilisez `$boostLevel[]` pour obtenir directly le level (0-3) without calculer les paliers.
