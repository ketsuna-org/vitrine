---
layout: doc
title: $boostCount
translation_key: docs
category: "Entity Info"
function_name: boostCount
syntax: $boostCount
description: Returns the namebre de boosts (améliorations de server) actifs on the server courant.
---

# $boostCount

The `$boostCount` function **récupérer the namebre de boosts** (améliorations de server Nitro) actifs on the server courant.

## Syntax

```
$boostCount
```

## Parameters

No parameters.

## Return value

- **Type** : String (number)
- The namebre de boosts Nitro currently actifs on the server.

## Behavior

- Counts the boosts de all members qui ont boosté the server.
- Each user peut apporter 1 or 2 boosts selon son level Nitro.
- La value influence le level de boost of the server ($boostTier).

## Examples

### Statistiques de boost

```bdfd
$title[🚀 Boosts of the server]
$description[
**Number de boosts :** $boostCount
**Level :** Level $boostTier
**Prochain level :** $boostRequired boosts required
]
$thumbnail[$serverIcon]
$color[#F47FFF]
$sendMessage[]
```

### Message de remerciement

```bdfd
$title[💜 Boost détecté !]
$description[
Merci **$userName** pour ton boost ! 
The server compte now **$boostCount** boosts and est au **level $boostTier** !
]
$color[#9B59B6]
$sendMessage[$channelID[boosts]]
```

### Barre de progression

```bdfd
$let[current;$boostCount]
$let[needed;$boostRequired]

$title[📈 Progression des boosts]
$description[
**$current / $needed** boosts for the prochain level

Progression : $math[$current*100/$needed]%
]
$color[#F47FFF]
$sendMessage[]
```

## Notes

- Les boosts sont liés aux abonnements Nitro des members.
- Le boost est retiré if the member quitte the server or stops son abonnement.
- For the level current, use `$boostTier` (1, 2 or 3).
