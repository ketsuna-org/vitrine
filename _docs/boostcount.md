---
layout: doc
title: $boostCount
translation_key: docs
category: "Entity Info"
function_name: boostCount
syntax: $boostCount
description: Returns the namebre of boosts (améliorations of server) actifs on the server courant.
---

# $boostCount

The `$boostCount` function **récupérer the namebre of boosts** (améliorations of server Nitro) actifs on the server courant.

## Syntax

```
$boostCount
```

## Parameters

No parameters.

## Return value

- **Type** : String (number)
- The namebre of boosts Nitro currently actifs on the server.

## Behavior

- Counts the boosts of all members qui ont boosté the server.
- Each user peut apporter 1 or 2 boosts according to son level Nitro.
- La value influence le level of boost of the server ($boostTier).

## Examples

### Statistiques of boost

```bdfd
$title[🚀 Boosts of the server]
$description[
**Number of boosts :** $boostCount
**Level :** Level $boostTier
**Prochain level :** $boostRequired boosts required
]
$thumbnail[$serverIcon]
$color[#F47FFF]
$sendMessage[]
```

### Message of remerciement

```bdfd
$title[💜 Boost détecté !]
$description[
Merci **$userName** pour ton boost ! 
The server compte now **$boostCount** boosts and est to the **level $boostTier** !
]
$color[#9B59B6]
$sendMessage[$channelID[boosts]]
```

### Barre of progression

```bdfd
$let[current;$boostCount]
$let[needed;$boostRequired]

$title[📈 Progression boosts]
$description[
**$current / $needed** boosts for the prochain level

Progression : $math[$current*100/$needed]%
]
$color[#F47FFF]
$sendMessage[]
```

## Notes

- Les boosts sont liés to the abonnements Nitro members.
- Le boost est retiré if the member quitte the server or stops son abonnement.
- For the level current, use `$boostTier` (1, 2 or 3).
