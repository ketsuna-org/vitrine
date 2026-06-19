---
layout: doc
title: $stickerCount[]
translation_key: docs
category: "Entity Info"
function_name: stickerCount
syntax: $stickerCount
description: Returns the number de stickers customs availables on the server Discord.
---

# $stickerCount[] — Number de Stickers

`$stickerCount[]` retourne the namebre de stickers customs availables on the server Discord.

## Syntax

```
$stickerCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre de stickers customs of the server.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🏷️ **$stickerCount** stickers customs sur ce server.]
```

### Embed statistiques

```bdfd
$title[📊 Contenu de $serverName]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Vérification de disponibilité

```bdfd
$if[$stickerCount==0]
$sendMessage[ℹ️ Ce server n'a pas encore de stickers customs.]
$else
$sendMessage[✅ $stickerCount stickers availables !]
$endif
```

### Compareason emojis/stickers

```bdfd
$title[Contenu of the server]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[📦 Total contenu;$sum[$emojiCount;$stickerCount];yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Les stickers sont differents des emojis : these are des images plus grandes, often animées (APNG or Lottie).
- La limit de stickers dépend du level de boost :
  - Level 0 : 5 stickers (standard), 0 custom
  - Level 1 : 15 slots custom
  - Level 2 : 30 slots custom
  - Level 3 : 60 slots custom
- Les stickers customs ne can be utilisés que on the server où ils were createds (except for the servers partenaires/vérifiés).
