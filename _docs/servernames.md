---
layout: doc
title: $serverNames[]
translation_key: docs
category: "Entity Info"
function_name: serverNames
syntax: $serverNames
description: Returns the list des noms de all servers in thesquels the bot est présent, separateds par des virgules.
---

# $serverNames[] — Noms de Tous les Servers

`$serverNames[]` retourne la list complete des noms de all servers Discord sur lesquels the bot est installé.

## Syntax

```
$serverNames
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- Une string contenant all noms de servers, separateds par des virgules (ex: `"Server A, Server B, Server C"`).

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🌐 Mes servers : $serverNames]
```

### Embed list des servers

```bdfd
$title[🌐 Servers du Bot]
$description[$serverNames]
$footer[Total : $serverCount servers]
$color[#5865F2]
$sendEmbedMessage
```

### Vérifier la présence sur un server

```bdfd
$if[$serverNames$contains[Communauté Gaming]]
$sendMessage[✅ The bot est bien sur la Communauté Gaming !]
$else
$sendMessage[❌ The bot is not sur la Communauté Gaming.]
$endif
```

### Statistiques avec list

```bdfd
$title[📊 Bot Statistics]
$addField[🌐 Total servers;$serverCount;yes]
$addField[📋 List;$serverNames;no]
$addField[🔢 Shard;$shardID;yes]
$color[#2ECC71]
$sendEmbedMessage
```

## Notes

- La list can be très longue si the bot est sur de many servers — attention à la limit de 2000 becauseactères par message Discord.
- Les noms sont separateds par `", "` (virgule + espace).
- Pour the namebre total without the list, utilisez `$serverCount[]`.
- Utilisez `$contains[]` pour vérifier la présence d'un nom spécifique, mais attention aux noms partials.
- Les noms peuvent contenir des becauseactères special and des emojis.
