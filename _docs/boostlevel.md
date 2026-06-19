---
layout: doc
title: $boostLevel[]
translation_key: docs
category: "Entity Info"
function_name: boostLevel
syntax: $boostLevel
description: Retourne le niveau de boost Nitro du serveur Discord (0, 1, 2 ou 3).
parameters: []
returns:
  type: integer
  description: Le niveau de boost (0=Aucun, 1=Niveau 1, 2=Niveau 2, 3=Niveau 3).
related:
  - $serverBoostCount
  - $serverBanner
  - $serverVanityURL
  - $serverSplash
examples:
  - description: Afficher le niveau de boost
    code: |
      $sendMessage[Niveau de boost : $boostLevel]
  - description: Vérifier les avantages
    code: |
      $if[$boostLevel>=2]
      $sendMessage[Bannière disponible !]
      $endif
---

# $boostLevel[] — Niveau de Boost du Serveur

`$boostLevel[]` retourne le niveau de boost Nitro actuel du serveur, une valeur entre 0 et 3.

## Syntaxe

```
$boostLevel
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Un entier de 0 à 3 :

| Niveau | Boosts requis | Avantages principaux |
|--------|---------------|---------------------|
| 0 | 0 | Aucun avantage |
| 1 | 2 | +50 emplacements d'émojis, icône animée, audio 128 kbps |
| 2 | 7 | Bannière de serveur, audio 256 kbps, +100 emoji |
| 3 | 14 | URL personnalisée, audio 384 kbps, +150 emoji |

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🚀 Niveau de boost : **$boostLevel** ($serverBoostCount boosts)]
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
$addField[Niveau actuel;$boostLevel;yes]
$addField[Boosts;$serverBoostCount;yes]
$if[$boostLevel<3]
$addField[Prochain niveau;$var[boostsNeeded] boosts restants pour le niveau $var[nextLevel];yes]
$endif
$color[#F47FFF]
$sendEmbedMessage
```

### Vérification des avantages

```bdfd
$if[$boostLevel>=1]
$sendMessage[✅ Icône animée disponible]
$endif
$if[$boostLevel>=2]
$sendMessage[✅ Bannière de serveur disponible]
$endif
$if[$boostLevel>=3]
$sendMessage[✅ URL personnalisée disponible]
$endif
```

### Info serveur avec boost

```bdfd
$title[$serverName]
$addField[🚀 Niveau de boost;$boostLevel ($serverBoostCount boosts);yes]
$addField[🎨 Émojis;$emojiCount;yes]
$addField[🔊 Qualité audio;$if[$boostLevel>=3]384 kbps$elseIf[$boostLevel>=2]256 kbps$elseIf[$boostLevel>=1]128 kbps$elseStandard$endif;yes]
$thumbnail[$serverIcon]
$color[#F47FFF]
$sendEmbedMessage
```

## Notes

- Le niveau de boost est calculé automatiquement en fonction du nombre de boosts Nitro.
- Chaque palier débloque des avantages cumulatifs (le niveau 3 inclut les avantages des niveaux 1 et 2).
- Les boosts expirés sont automatiquement retirés.
- Pour obtenir le nombre exact de boosts, utilisez `$serverBoostCount[]`.
