---
layout: doc
title: $serverEmojis[]
translation_key: docs
category: "Entity Info"
function_name: serverEmojis
syntax: $serverEmojis
description: Returns the list emojis customs availables on the server Discord.
---

# $serverEmojis[] — List Emojis of the Server

`$serverEmojis[]` retourne la list complete emojis customs of the server, formatteds pour être displayeds in Discord.

## Syntax

```
$serverEmojis
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- Une string contenant all emojis customs of the server, chacun to the format `<:nom:id>` (or `<a:nom:id>` for the emojis animés).

## Utilisation

### Display all emojis

```bdfd
$sendMessage[🎨 Emojis of the server : $serverEmojis]
```

### Embed catalogue of emojis

```bdfd
$title[Emojis of $serverName]
$description[$serverEmojis]
$footer[Total : $emojiCount emojis]
$color[#F1C40F]
$sendEmbedMessage
```

### Condition on the namebre of emojis

```bdfd
$if[$emojiCount>=50]
$sendMessage[🎉 Ce server a une riche collection of emojis ! ($emojiCount)]
$else
$sendMessage[The server a $emojiCount emojis customs.]
$endif
```

### Info server with emojis

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

- La list can be très longue si the server a beaucoup of emojis — attention to la limit of 2000 becauseactères messages Discord.
- Les emojis animés sont préfixés par `<a:` instead of `<:`.
- Pour obtenir only the namebre of emojis without the list, utilisez `$emojiCount[]`.
- La limit of emojis par server dépend of the level of boost (50 default, until 250 to the level 3).
