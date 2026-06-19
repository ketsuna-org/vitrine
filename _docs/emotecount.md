---
layout: doc
title: $emojiCount / $emoteCount
translation_key: docs
category: "Moderation"
function_name: emojiCount
syntax: $emojiCount / $emoteCount
description: Returns the namebre total of emojis customs on the server courant. $emoteCount est un alias of $emojiCount.
---

# $emojiCount / $emoteCount

The `$emojiCount` function (alias `$emoteCount`) allows **récupérer the namebre total of emojis customs** présents on the server courant.

## Syntax

```
$emojiCount
```
or
```
$emoteCount
```

## Parameters

No parameters.

## Return value

- **Type** : String (number)
- The namebre total of emojis customs on the server.
- Inclut to la fois les emojis statics and animés.

## Behavior

- `$emoteCount` est un alias exact of `$emojiCount` (même behavior).
- Counts all emojis customs of the server.
- Utile pour check the usage slots of emojis availables.

## Examples

### Statistiques of emojis

```bdfd
$title[🎨 Emojis of the server]
$description[
**Number total :** $emojiCount
**Limit :** 50 emojis (plus for servers boostés)
**Slots restants :** $math[50-$emojiCount]
]
$color[#5865F2]
$sendMessage[]
```

### Alerte of limit

```bdfd
$if[$emojiCount>=50]
  $sendMessage[⚠️ La limit of emojis est atteinte ($emojiCount/50). Supprimez of emojis inutilisés.]
$else
  $sendMessage[✅ $math[50-$emojiCount] slots of emojis availables.]
$endif
```

### Affichage with alias

```bdfd
$title[📊 Infos server]
$description[
**Members :** $membersCount
**Channels :** $channelCount
**Roles :** $roleCount
**Emojis :** $emoteCount
]
$sendMessage[]
```

## Notes

- Les two noms (`$emojiCount` and `$emoteCount`) sont interchangeables.
- La limit of base est 50 emojis, extensible with the boosts of the server.
- Les emojis animés and statics partagent limits separatedes.
