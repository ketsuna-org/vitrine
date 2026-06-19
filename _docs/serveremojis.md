---
layout: doc
title: $serverEmojis[]
translation_key: docs
category: "Entity Info"
function_name: serverEmojis
syntax: $serverEmojis
description: Returns the list des emojis customs availables on the server Discord.
---

# $serverEmojis[] — List des Emojis du Server

`$serverEmojis[]` retourne la list complete des emojis customs of the server, formatteds pour être displayeds dans Discord.

## Syntax

```
$serverEmojis
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- Une string contenant all emojis customs of the server, chacun au format `<:nom:id>` (or `<a:nom:id>` for the emojis animés).

## Utilisation

### Afficher all emojis

```bdfd
$sendMessage[🎨 Emojis of the server : $serverEmojis]
```

### Embed catalogue d'emojis

```bdfd
$title[Emojis de $serverName]
$description[$serverEmojis]
$footer[Total : $emojiCount emojis]
$color[#F1C40F]
$sendEmbedMessage
```

### Condition sur the namebre d'emojis

```bdfd
$if[$emojiCount>=50]
$sendMessage[🎉 Ce server a une riche collection d'emojis ! ($emojiCount)]
$else
$sendMessage[The server a $emojiCount emojis customs.]
$endif
```

### Info server avec emojis

```bdfd
$title[$serverName]
$addField[👥 Members;$membersCount;yes]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- La list can be très longue si the server a beaucoup d'emojis — attention à la limit de 2000 becauseactères des messages Discord.
- Les emojis animés sont préfixés par `<a:` instead of `<:`.
- Pour obtenir only the namebre d'emojis without the list, utilisez `$emojiCount[]`.
- La limit d'emojis par server dépend du level de boost (50 default, until 250 au level 3).
