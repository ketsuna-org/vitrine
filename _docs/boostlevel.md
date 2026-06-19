---
layout: doc
title: $boostLevel[]
translation_key: docs
category: "Entity Info"
function_name: boostLevel
syntax: $boostLevel
description: Returns the level de boost Nitro of the Discord server (0, 1, 2 or 3).
---

# $boostLevel[] — Level de Boost du Server

`$boostLevel[]` returns the level de boost Nitro current of the server, a value between 0 and 3.

## Syntax

```
$boostLevel
```

## Parameters

No parameters.

## Return value

- **Type** : `integer`
- Un integer de 0 à 3 :

| Level | Boosts required | Avantages principaux |
|--------|---------------|---------------------|
| 0 | 0 | Aucun beforeage |
| 1 | 2 | +50 placeholders d'emojis, icon animée, audio 128 kbps |
| 2 | 7 | Banner de server, audio 256 kbps, +100 emoji |
| 3 | 14 | URL custome, audio 384 kbps, +150 emoji |

## Usage

### Simple display

```bdfd
$sendMessage[🚀 Level de boost : **$boostLevel** ($serverBoostCount boosts)]
```

### Embed de progression

```bdfd
$var[boostsNeeded;0]
$if[$boostLevel==0]
$var[boostsNeeded;$sub[2;$serverBoostCount]]
$var[nextLevel;1]
$elseIf[$boostLevel==1]
$var[boostsNeeded;$sub[7;$serverBoostCount]]
$var[nextLevel;2]
$elseIf[$boostLevel==2]
$var[boostsNeeded;$sub[14;$serverBoostCount]]
$var[nextLevel;3]
$else
$var[boostsNeeded;0]
$var[nextLevel;MAX]
$endif

$title[🚀 Boost — $serverName]
$addField[Level current;$boostLevel;yes]
$addField[Boosts;$serverBoostCount;yes]
$if[$boostLevel<3]
$addField[Prochain level;$var[boostsNeeded] boosts restants for the level $var[nextLevel];yes]
$endif
$color[#F47FFF]
$sendEmbedMessage
```

### Vérification des beforeages

```bdfd
$if[$boostLevel>=1]
$sendMessage[✅ Icon animée available]
$endif
$if[$boostLevel>=2]
$sendMessage[✅ Banner de server available]
$endif
$if[$boostLevel>=3]
$sendMessage[✅ URL custome available]
$endif
```

### Info server avec boost

```bdfd
$title[$serverName]
$addField[🚀 Level de boost;$boostLevel ($serverBoostCount boosts);yes]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🔊 Qualité audio;$if[$boostLevel>=3]384 kbps$elseIf[$boostLevel>=2]256 kbps$elseIf[$boostLevel>=1]128 kbps$elseStandard$endif;yes]
$thumbnail[$serverIcon]
$color[#F47FFF]
$sendEmbedMessage
```

## Notes

- Le level de boost is calculated automatically depending on of the namebre de boosts Nitro.
- Each palier débloque des beforeages cumulatifs (le level 3 inclut les beforeages des levelx 1 and 2).
- Les boosts expirés sont automatically retirés.
- Pour obtenir the namebre exact de boosts, use `$serverBoostCount[]`.
