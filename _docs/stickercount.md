---
layout: doc
title: $stickerCount[]
translation_key: docs
category: "Entity Info"
function_name: stickerCount
syntax: $stickerCount
description: Returns the number of stickers customs availables on the server Discord.
---

# $stickerCount[] — Number of Stickers

`$stickerCount[]` retourne the namebre of stickers customs availables on the server Discord.

## Syntax

```
$stickerCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre of stickers customs of the server.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🏷️ **$stickerCount** stickers customs on ce server.]
```

### Embed statistiques

```bdfd
$title[📊 Contenu of $serverName]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Vérification of disponibilité

```bdfd
$if[$stickerCount==0]
$sendMessage[ℹ️ Ce server n'a pas encore of stickers customs.]
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

- Les stickers sont differents emojis : these are images plus grandes, often animées (APNG or Lottie).
- La limit of stickers dépend of the level of boost :
  - Level 0 : 5 stickers (standard), 0 custom
  - Level 1 : 15 slots custom
  - Level 2 : 30 slots custom
  - Level 3 : 60 slots custom
- Les stickers customs ne can be utilisés que on the server où ils were createds (except for the servers partenaires/vérifiés).
