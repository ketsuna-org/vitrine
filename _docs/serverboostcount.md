---
layout: doc
title: $serverBoostCount[]
translation_key: docs
category: "Entity Info"
function_name: serverBoostCount
syntax: $serverBoostCount
description: Returns the number of boosts Nitro actifs on the server Discord.
---

# $serverBoostCount[] — Number of Boosts of the Server

`$serverBoostCount[]` retourne the namebre total of boosts Nitro appliqués to the server. The boosts allow débloquer beforeages for the server (plus of emojis, meilleure qualité audio, banner, etc.).

## Syntax

```
$serverBoostCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre of boosts Nitro actifs on the server.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🚀 **$serverBoostCount** boosts Nitro on ce server !]
```

### Embed of remerciement

```bdfd
$title[🚀 Boosters of $serverName]
$description[Merci to the $serverBoostCount boosters qui soutiennent the server !]
$addField[Level current;$boostLevel;yes]
$addField[Prochain palier;$if[$boostLevel<3]Plus que $sub[$var[boostsNeeded];$serverBoostCount] boosts !$elseLevel maximum atteint 🎉$endif;yes]
$color[#F47FFF]
$sendEmbedMessage
```

### Info server complete

```bdfd
$title[📊 Statistiques of $serverName]
$addField[👥 Members;$membersCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🚀 Boosts;$serverBoostCount (Level $boostLevel);yes]
$addField[🎨 Emojis;$emojiCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Condition of encouragement

```bdfd
$if[$serverBoostCount>=14]
$sendMessage[🌟 Level 3 atteint ! Profitez of all beforeages.]
$elseIf[$serverBoostCount>=7]
$sendMessage[🎈 Level 2 ! Plus que $sub[14;$serverBoostCount] boosts for the level 3.]
$elseIf[$serverBoostCount>=2]
$sendMessage[🎀 Level 1 ! Plus que $sub[7;$serverBoostCount] boosts for the level 2.]
$else
$sendMessage[💪 Aucun level of boost. $sub[2;$serverBoostCount] boosts required for the level 1.]
$endif
```

## Notes

- Chaque boost compte pour 1, peu importe qui l'a appliqué.
- The namebre of boosts détermine le level of boost of the server :
  - Level 1 : 2 boosts
  - Level 2 : 7 boosts
  - Level 3 : 14 boosts
- Utilisez `$boostLevel[]` pour obtenir directly le level (0-3) without calculer les paliers.
