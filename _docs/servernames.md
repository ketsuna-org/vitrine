---
layout: doc
title: $serverNames[]
translation_key: docs
category: "Entity Info"
function_name: serverNames
syntax: $serverNames
description: Returns the list noms of all servers in thesquels the bot est présent, separateds par virgules.
---

# $serverNames[] — Noms of Tous les Servers

`$serverNames[]` retourne la list complete noms of all servers Discord on lesquels the bot est installé.

## Syntax

```
$serverNames
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- Une string contenant all noms of servers, separateds par virgules (ex: `"Server A, Server B, Server C"`).

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🌐 Mes servers : $serverNames]
```

### Embed list servers

```bdfd
$title[🌐 Servers of the Bot]
$description[$serverNames]
$footer[Total : $serverCount servers]
$color[#5865F2]
$sendEmbedMessage
```

### Vérifier la présence on a server

```bdfd
$if[$serverNames$contains[Communauté Gaming]]
$sendMessage[✅ The bot est bien on the Communauté Gaming !]
$else
$sendMessage[❌ The bot is not on the Communauté Gaming.]
$endif
```

### Statistiques with list

```bdfd
$title[📊 Bot Statistics]
$addField[🌐 Total servers;$serverCount;yes]
$addField[📋 List;$serverNames;no]
$addField[🔢 Shard;$shardID;yes]
$color[#2ECC71]
$sendEmbedMessage
```

## Notes

- La list can be très longue si the bot est on of many servers — attention to la limit of 2000 becauseactères par message Discord.
- Les noms sont separateds par `", "` (virgule + espace).
- Pour the namebre total without the list, utilisez `$serverCount[]`.
- Utilisez `$contains[]` pour check the présence of un nom specific, mais attention to the noms partials.
- Les noms can contain becauseactères special and emojis.
