---
layout: doc
title: $serverCount[]
translation_key: docs
category: "Entity Info"
function_name: serverCount
syntax: $serverCount
description: Returns the number total de servers in thesquels the bot est présent.
---

# $serverCount[] — Number de Servers du Bot

`$serverCount[]` retourne the namebre total de servers Discord sur lesquels the bot est installé.

## Syntax

```
$serverCount
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The namebre de servers auxquels the bot appartient.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🤖 Je suis currentlement sur **$serverCount** servers !]
```

### Statistiques of the bot

```bdfd
$title[📊 Statistiques du Bot]
$addField[🌐 Servers;$serverCount;yes]
$addField[🔢 Shard;$shardID;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Message de status custom

```bdfd
$title[🤖 Mon Bot]
$description[Merci de m'utiliser !]
$addField[Servers;$serverCount;yes]
$addField[Latence;$ping ms;yes]
$footer[Développé avec BDFD]
$color[#2ECC71]
$sendEmbedMessage
```

### Condition sur la popularité

```bdfd
$if[$serverCount>=100]
$sendMessage[🎉 Merci aux $serverCount servers qui me font confiance !]
$else
$sendMessage[Je suis sur $serverCount servers. Aidez-moi à grandir !]
$endif
```

## Notes

- `$serverCount[]` est un alias de `$guildCount[]`.
- Le compte inclut all servers où the bot est présent, regardless of the shard.
- The namebre est mis à day automatically when the bot rejoint or quitte un server.
- Utile for the commands de statistiques and les pages "À propos" of the bot.
