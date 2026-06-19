---
layout: doc
title: $guildCount[]
translation_key: docs
category: "Entity Info"
function_name: guildCount
syntax: $guildCount
description: Alias de $serverCount. Returns the number total de servers in thesquels the bot est présent.
---

# $guildCount[] — Number de Servers (Alias)

`$guildCount[]` est un alias de `$serverCount[]`. Il retourne the namebre total de servers Discord sur lesquels the bot est installé.

## Syntax

```
$guildCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre de servers auxquels the bot appartient.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🤖 Présent sur **$guildCount** servers !]
```

### Statistiques of the bot

```bdfd
$title[📊 Statistiques du Bot]
$addField[🌐 Guildes;$guildCount;yes]
$addField[🔢 Shard;$shardID;yes]
$addField[📶 Ping;$ping ms;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Condition de popularité

```bdfd
$if[$guildCount>=50]
$sendMessage[🎉 +$guildCount servers ! Merci à all !]
$else
$sendMessage[Bot présent sur $guildCount servers.]
$endif
```

## Notes

- `$guildCount[]` and `$serverCount[]` sont strictement identicals.
- Le compte est global (all shards confondus).
- Se met à day automatically durings joins/leaves of the bot.
