---
layout: doc
title: $shardID[]
translation_key: docs
category: "Entity Info"
function_name: shardID
syntax: $shardID
description: Returns the identifier of the shard current on lequel the command est executed. The shards are used pour répartir la charge bots on of many servers.
---

# $shardID[] — Identifier of the Shard

`$shardID[]` retourne l'identifier of the shard Discord on lequel the bot exécute the command. The sharding est une technique utilisée par Discord pour répartir la charge bots populaires on several processus.

## Syntax

```
$shardID
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- The ID of the shard courant, commençant to 0.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🔢 Shard : **$shardID**]
```

### Statistiques of the bot

```bdfd
$title[📊 Statistiques of the Bot]
$addField[🔢 Shard;$shardID;yes]
$addField[🌐 Servers (ce shard);$serverCount;yes]
$addField[📶 Ping;$ping ms;yes]
$color[#2ECC71]
$sendEmbedMessage
```

### Log with shard

```bdfd
$log[Shard $shardID — Command executed on $serverName]
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

- Si votre bot is not shardé (moins of ~2500 servers), `$shardID[]` retournera probably `0`.
- Le sharding devient nécessaire when the bot atteint un grand number of servers (plus of 2500).
- Chaque shard gère un sous-ensemble servers of the bot.
- The ID of shard est utile for the débogage and l'identification of problèmes on shards specifics.
- Les commands sont toudays executeds in the context of a single shard.
