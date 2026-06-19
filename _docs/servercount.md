---
layout: doc
title: $serverCount[]
translation_key: docs
category: "Entity Info"
function_name: serverCount
syntax: $serverCount
description: Returns the number total of servers in thesquels the bot est présent.
---

# $serverCount[] — Number of Servers of the Bot

`$serverCount[]` retourne the namebre total of servers Discord on lesquels the bot est installé.

## Syntax

```
$serverCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre of servers auxquels the bot appartient.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🤖 Je suis currentlement on **$serverCount** servers !]
```

### Statistiques of the bot

```bdfd
$title[📊 Statistiques of the Bot]
$addField[🌐 Servers;$serverCount;yes]
$addField[🔢 Shard;$shardID;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Message of status custom

```bdfd
$title[🤖 Mon Bot]
$description[Merci of m'use !]
$addField[Servers;$serverCount;yes]
$addField[Latence;$ping ms;yes]
$footer[Développé with BDFD]
$color[#2ECC71]
$sendEmbedMessage
```

### Condition on the popularité

```bdfd
$if[$serverCount>=100]
$sendMessage[🎉 Merci to the $serverCount servers qui me font confiance !]
$else
$sendMessage[Je suis on $serverCount servers. Aidez-moi to grandir !]
$endif
```

## Notes

- `$serverCount[]` est un alias of `$guildCount[]`.
- Le compte inclut all servers où the bot est présent, regardless of the shard.
- The namebre est mis to day automatically when the bot rejoint or quitte un server.
- Utile for the commands of statistiques and les pages "À propos" of the bot.
