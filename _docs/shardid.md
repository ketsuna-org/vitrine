---
layout: doc
title: $shardID[]
translation_key: docs
category: "Entity Info"
function_name: shardID
syntax: $shardID
description: Returns the shard identifier supplied by the host in the bot.shardId context variable, or 0.
---

# $shardID[] — Shard ID

`$shardID[]` returns the value of the `bot.shardId` context variable supplied by the host. The engine itself has no notion of shards.

## Syntax

```
$shardID
```

## Parameters

None.

## Return Value

- **Type**: `integer` (as text)
- The text of `bot.shardId` as supplied by the host.
- `0` if the host supplied none.

## Examples

### Simple display

```bdfd
$sendMessage[🔢 Shard: **$shardID**]
```

### Bot statistics

```bdfd
$title[📊 Bot Statistics]
$addField[🔢 Shard;$shardID;yes]
$addField[🌐 Servers;$serverCount;yes]
$addField[📶 Ping;$ping ms;yes]
$color[#2ECC71]
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
```

## Notes

- `$shardID` takes no argument.
- `$serverCount` counts all the servers returned by Discord for the bot, not only those of one shard.
