---
layout: doc
title: $boostCount
translation_key: docs
category: "Entity Info"
function_name: boostCount
syntax: $boostCount
description: Retourne le nombre de boosts (améliorations de serveur) actifs sur le serveur courant.
parameters: []
returns:
  - type: string (number)
    description: Le nombre de boosts Nitro actifs sur le serveur.
related:
  - $boostTier
  - $serverName
  - $guildID
  - $allMembersCount
examples:
  - description: Nombre de boosts du serveur
    code: $boostCount
---

# $boostCount

La fonction `$boostCount` permet de **récupérer le nombre de boosts** (améliorations de serveur Nitro) actifs sur le serveur courant.

## Syntaxe

```
$boostCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : String (nombre)
- Le nombre de boosts Nitro actuellement actifs sur le serveur.

## Comportement

- Compte les boosts de tous les membres qui ont boosté le serveur.
- Chaque utilisateur peut apporter 1 ou 2 boosts selon son niveau Nitro.
- La valeur influence le niveau de boost du serveur ($boostTier).

## Exemples

### Statistiques de boost

```bdfd
$title[🚀 Boosts du serveur]
$description[
**Nombre de boosts :** $boostCount
**Niveau :** Niveau $boostTier
**Prochain niveau :** $boostRequired boosts requis
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
Le serveur compte maintenant **$boostCount** boosts et est au **niveau $boostTier** !
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
**$current / $needed** boosts pour le prochain niveau

Progression : $math[$current*100/$needed]%
]
$color[#F47FFF]
$sendMessage[]
```

## Notes

- Les boosts sont liés aux abonnements Nitro des membres.
- Le boost est retiré si le membre quitte le serveur ou arrête son abonnement.
- Pour le niveau actuel, utilisez `$boostTier` (1, 2 ou 3).
