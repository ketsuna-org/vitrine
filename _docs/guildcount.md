---
layout: doc
title: $guildCount[]
translation_key: docs
category: "Entity Info"
function_name: guildCount
syntax: $guildCount
description: Alias of $serverCount. Returns the total number of servers the bot is present on.
---

# $guildCount[] — Number of Servers (Alias)

`$guildCount[]` is an alias of `$serverCount[]`. It returns the total number of Discord servers the bot is installed on.

## Syntax

```
$guildCount
```

## Parameters

No parameters.

## Return Value

- **Type**: `integer`
- The number of servers the bot belongs to.

## Usage

### Simple Display

```bdfd
$sendMessage[🤖 Present on **$guildCount** servers!]
```

### Bot Statistics

```bdfd
$title[📊 Bot Statistics]
$addField[🌐 Guilds;$guildCount;yes]
$addField[🔢 Shard;$shardID;yes]
$addField[📶 Ping;$ping ms;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Popularity Condition

```bdfd
$if[$guildCount>=50]
$sendMessage[🎉 +$guildCount servers! Thank you all!]
$else
$sendMessage[Bot present on $guildCount servers.]
$endif
```

## Notes

- `$guildCount[]` and `$serverCount[]` are strictly identical.
- The count is global (all shards combined).
- Updates automatically during bot joins/leaves.
