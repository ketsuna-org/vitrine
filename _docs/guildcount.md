---
layout: doc
title: $guildCount[]
translation_key: docs
category: "Entity Info"
function_name: guildCount
syntax: $guildCount
description: Alias of $serverCount. Returns the number total of servers in thesquels the bot est présent.
---

# $guildCount[] — Number of Servers (Alias)

`$guildCount[]` est un alias of `$serverCount[]`. Il retourne the namebre total of servers Discord on lesquels the bot est installé.

## Syntax

```
$guildCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre of servers auxquels the bot appartient.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🤖 Présent on **$guildCount** servers !]
```

### Statistiques of the bot

```bdfd
$title[📊 Statistiques of the Bot]
$addField[🌐 Guildes;$guildCount;yes]
$addField[🔢 Shard;$shardID;yes]
$addField[📶 Ping;$ping ms;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Condition of popularité

```bdfd
$if[$guildCount>=50]
$sendMessage[🎉 +$guildCount servers ! Merci to all !]
$else
$sendMessage[Bot présent on $guildCount servers.]
$endif
```

## Notes

- `$guildCount[]` and `$serverCount[]` sont strictement identicals.
- Le compte est global (all shards confondus).
- Se met to day automatically durings joins/leaves of the bot.
