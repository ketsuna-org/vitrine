---
layout: doc
title: $stickerCount[]
translation_key: docs
category: "Entity Info"
function_name: stickerCount
syntax: $stickerCount
description: Retourne le nombre de stickers personnalisés disponibles sur le serveur Discord.
parameters: []
returns:
  type: integer
  description: Le nombre de stickers personnalisés du serveur.
related:
  - $emojiCount
  - $serverEmojis
  - $serverInfo
  - $boostLevel
examples:
  - description: Afficher le nombre de stickers
    code: |
      $sendMessage[🏷️ $stickerCount stickers sur ce serveur]
  - description: Embed info serveur
    code: |
      $title[$serverName]
      $addField[🏷️ Stickers;$stickerCount;yes]
      $addField[🎨 Émojis;$emojiCount;yes]
      $color[#5865F2]
      $sendEmbedMessage
---

# $stickerCount[] — Nombre de Stickers

`$stickerCount[]` retourne le nombre de stickers personnalisés disponibles sur le serveur Discord.

## Syntaxe

```
$stickerCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre de stickers personnalisés du serveur.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🏷️ **$stickerCount** stickers personnalisés sur ce serveur.]
```

### Embed statistiques

```bdfd
$title[📊 Contenu de $serverName]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[🎨 Émojis;$emojiCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Vérification de disponibilité

```bdfd
$if[$stickerCount==0]
$sendMessage[ℹ️ Ce serveur n'a pas encore de stickers personnalisés.]
$else
$sendMessage[✅ $stickerCount stickers disponibles !]
$endif
```

### Comparaison émojis/stickers

```bdfd
$title[Contenu du serveur]
$addField[🎨 Émojis;$emojiCount;yes]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[📦 Total contenu;$sum[$emojiCount;$stickerCount];yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Les stickers sont différents des émojis : ce sont des images plus grandes, souvent animées (APNG ou Lottie).
- La limite de stickers dépend du niveau de boost :
  - Niveau 0 : 5 stickers (standard), 0 custom
  - Niveau 1 : 15 slots custom
  - Niveau 2 : 30 slots custom
  - Niveau 3 : 60 slots custom
- Les stickers personnalisés ne peuvent être utilisés que sur le serveur où ils ont été créés (sauf pour les serveurs partenaires/vérifiés).
