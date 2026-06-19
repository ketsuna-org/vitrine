---
layout: doc
title: $shardID[]
translation_key: docs
category: "Entity Info"
function_name: shardID
syntax: $shardID
description: Returns the identifier du shard current sur lequel the command est executed. The shards are used pour répartir la charge des bots sur de many servers.
---

# $shardID[] — Identifier of the Shard

`$shardID[]` retourne l'identifier du shard Discord sur lequel the bot exécute the command. The sharding est une technique utilisée par Discord pour répartir la charge des bots populaires sur several processus.

## Syntax

```
$shardID
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The ID of the shard courant, commençant à 0.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🔢 Shard : **$shardID**]
```

### Statistiques of the bot

```bdfd
$title[📊 Statistiques du Bot]
$addField[🔢 Shard;$shardID;yes]
$addField[🌐 Servers (ce shard);$serverCount;yes]
$addField[📶 Ping;$ping ms;yes]
$color[#2ECC71]
$sendEmbedMessage
```

### Log avec shard

```bdfd
$log[Shard $shardID — Command executed sur $serverName]
```

### Debug

```bdfd
$title[🐛 Debug Info]
$addField[Shard;$shardID;yes]
$addField[Server;$serverName ($serverID);yes]
$addField[Channel;$channelID;yes]
$addField[User;$username ($authorID);yes]
$color[#E74C3C]
$sendEmbedMessage
```

## Notes

- Si votre bot is not shardé (moins de ~2500 servers), `$shardID[]` retournera probably `0`.
- Le sharding devient nécessaire when the bot atteint un grand number de servers (plus de 2500).
- Chaque shard gère un sous-ensemble des servers of the bot.
- The ID de shard est utile for the débogage and l'identification de problèmes sur des shards spécifiques.
- Les commands sont toudays executeds in the context d'a single shard.
