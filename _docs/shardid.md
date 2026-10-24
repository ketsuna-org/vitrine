---
layout: doc
title: $shardID[]
translation_key: docs
category: "Entity Info"
function_name: shardID
syntax: $shardID[(Guild ID)]
description: Returns the shard of the bot, or the shard that serves the given server.
---

# $shardID[] — Shard ID

`$shardID[]` returns the value of the `bot.shardId` context variable supplied by the host. With a server ID, it computes the shard that serves that server. The engine itself has no notion of shards.

## Syntax

```
$shardID[(Guild ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Guild ID` | Optional. The server whose shard is wanted. If omitted or empty, the shard of the bot. A non-numeric or zero value raises `Invalid guild ID.` |

## Return Value

- **Type**: `integer` (as text)
- Without a server ID: the text of `bot.shardId` as supplied by the host, or `0` if the host supplied none.
- With a server ID: `(guild ID >> 22) % number of shards`, the rule Discord uses. The number of shards is the `bot.shardCount` context variable supplied by the host; without it there is a single shard, so the result is `0`.

## Examples

### Simple display

```bdfd
$sendMessage[🔢 Shard: **$shardID**]
```

### Shard of a server

```bdfd
$sendMessage[Shard of this server: $shardID[$guildID]]
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

- The server does not need to be one the bot is in: the shard is computed from the ID alone.
- `$serverCount` counts all the servers returned by Discord for the bot, not only those of one shard.
