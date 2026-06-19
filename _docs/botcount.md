---
layout: doc
title: $botCount[]
translation_key: docs
category: "Entity Info"
function_name: botCount
syntax: $botCount
description: Returns the namebre of bots présents on the server Discord.
---

# $botCount[] — Number of Bots

`$botCount[]` retourne the namebre of comptes bots présents on the server Discord.

## Syntax

```
$botCount
```

## Parameters

No parameters.

## Return value

- **Type** : `integer`
- The namebre of bots on the server.

## Usage

### Simple display

```bdfd
$sendMessage[🤖 **$botCount** bots on ce server.]
```

### Ratio humains/bots

```bdfd
$var[humans;$sub[$membersCount;$botCount]]
$title[📊 Composition of $serverName]
$addField[👤 Humains;$var[humans];yes]
$addField[🤖 Bots;$botCount;yes]
$addField[👥 Total;$membersCount;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Alerte si trop of bots

```bdfd
$if[$botCount>$var[humans]]
$sendMessage[⚠️ Il y a more than bots ($botCount) que of humains ($var[humans]) !]
$endif
```

### Embed statistiques complete

```bdfd
$title[📊 Statistiques of $serverName]
$addField[👥 Total;$membersCount;yes]
$addField[👤 Humains;$sub[$membersCount;$botCount];yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🟢 Online;$onlineMembers;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Un "bot" est déterminé par le flag `bot` set on the compte user Discord.
- Pour obtenir the namebre of humains, soustrayez `$botCount` of the total : `$sub[$membersCount;$botCount]`.
- The bot comptant lui-même est included in ce total.
