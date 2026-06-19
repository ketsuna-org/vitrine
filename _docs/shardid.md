---
layout: doc
title: $shardID[]
translation_key: docs
category: "Entity Info"
function_name: shardID
syntax: $shardID
description: Returns the identifier of the current shard on which the command is executed. Shards are used to distribute the bot's load across multiple servers.
---

# $shardID[] — Shard ID

`$shardID[]` returns the Discord shard ID on which the bot is executing the command. Sharding is a technique used by Discord to distribute the load of popular bots across several processes.

## Syntax

```
$shardID
```

## Parameters

None.

## Return Value

- **Type**: `integer`
- The ID of the current shard, starting at 0.

## Usage

### Simple display

```bdfd
$sendMessage[🔢 Shard: **$shardID**]
```

### Bot statistics

```bdfd
$title[📊 Bot Statistics]
$addField[🔢 Shard;$shardID;yes]
$addField[🌐 Servers (on this shard);$serverCount;yes]
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

- If your bot is not sharded (less than ~2500 servers), `$shardID[]` will probably return `0`.
- Sharding becomes necessary when the bot reaches a large number of servers (more than 2500).
- Each shard manages a subset of the bot's servers.
- The shard ID is useful for debugging and identifying problems on specific shards.
- Commands are always executed in the context of a single shard.
