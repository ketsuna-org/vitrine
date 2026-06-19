---
layout: doc
title: $serverNames[]
translation_key: docs
category: "Entity Info"
function_name: serverNames
syntax: $serverNames
description: Returns the names of all servers in which the bot is present, separated by commas.
---

# $serverNames[] — Names of All Servers

`$serverNames[]` returns the complete list of names of all Discord servers where the bot is installed.

## Syntax

```
$serverNames
```

## Parameters

None.

## Return Value

- **Type**: `string`
- A string containing all server names, separated by commas (e.g., `"Server A, Server B, Server C"`).

## Usage

### Simple display

```bdfd
$sendMessage[🌐 My servers: $serverNames]
```

### Embed list of servers

```bdfd
$title[🌐 Servers of the Bot]
$description[$serverNames]
$footer[Total: $serverCount servers]
$color[#5865F2]
$sendEmbedMessage
```

### Check presence on a server

```bdfd
$if[$serverNames$contains[Gaming Community]]
$sendMessage[✅ The bot is indeed on the Gaming Community!]
$else
$sendMessage[❌ The bot is not on the Gaming Community.]
$endif
```

### Statistics with server list

```bdfd
$title[📊 Bot Statistics]
$addField[🌐 Total servers;$serverCount;yes]
$addField[📋 List;$serverNames;no]
$addField[🔢 Shard;$shardID;yes]
$color[#2ECC71]
$sendEmbedMessage
```

## Notes

- The list can be very long if the bot is on many servers — watch out for the Discord message limit of 2000 characters.
- The names are separated by `", "` (comma + space).
- To get the total number of servers without the list, use `$serverCount[]`.
- Use `$contains[]` to check the presence of a specific name, but be careful with partial matches.
- The names can contain special characters and emojis.
