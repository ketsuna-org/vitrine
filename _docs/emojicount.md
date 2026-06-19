---
layout: doc
title: $emojiCount[]
translation_key: docs
category: "Entity Info"
function_name: emojiCount
syntax: $emojiCount
description: Retourne le nombre d'émojis personnalisés disponibles sur le serveur Discord.
parameters: []
returns:
  type: integer
  description: Le nombre total d'émojis personnalisés (statiques + animés).
related:
  - $serverEmojis
  - $stickerCount
  - $serverInfo
  - $boostLevel
examples:
  - description: Afficher le nombre d'émojis
    code: |
      $sendMessage[🎨 $emojiCount émojis personnalisés]
  - description: Vérifier les emplacements restants
    code: |
      $sendMessage[$emojiCount émojis utilisés sur $var[maxSlots] disponibles]
---

# $emojiCount[] — Nombre d'Émojis

`$emojiCount[]` retourne le nombre total d'émojis personnalisés disponibles sur le serveur, incluant les émojis statiques et animés.

## Syntaxe

```
$emojiCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre total d'émojis personnalisés.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🎨 **$emojiCount** émojis personnalisés sur ce serveur !]
```

### Emplacements disponibles

```bdfd
$var[maxEmojiSlots;50]
$if[$boostLevel==1]
$var[maxEmojiSlots;100]
$elseIf[$boostLevel==2]
$var[maxEmojiSlots;150]
$elseIf[$boostLevel==3]
$var[maxEmojiSlots;250]
$endif
$var[remainingSlots;$sub[$var[maxEmojiSlots];$emojiCount]]
$sendMessage[🎨 $emojiCount/$var[maxEmojiSlots] emplacements utilisés. $var[remainingSlots] restants.]
```

### Embed info serveur

```bdfd
$title[📊 $serverName]
$addField[🎨 Émojis;$emojiCount;yes]
$addField[🏷️ Stickers;$stickerCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Alerte si quota presque plein

```bdfd
$if[$emojiCount>=$var[maxEmojiSlots]]
$sendMessage[⚠️ Tous les emplacements d'émojis sont utilisés !]
$elseIf[$emojiCount>=$sub[$var[maxEmojiSlots];10]]
$sendMessage[⚠️ Plus que $sub[$var[maxEmojiSlots];$emojiCount] emplacements d'émojis disponibles.]
$endif
```

## Notes

- La limite d'émojis par défaut est de 50 (statiques) + 50 (animés).
- Le niveau de boost augmente ces limites :
  - Niveau 1 : 100 statiques + 100 animés
  - Niveau 2 : 150 statiques + 150 animés
  - Niveau 3 : 250 statiques + 250 animés
- Pour obtenir la liste complète des émojis (pas seulement le compte), utilisez `$serverEmojis[]`.
