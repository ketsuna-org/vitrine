---
layout: doc
title: $serverNames[]
translation_key: docs
category: "Entity Info"
function_name: serverNames
syntax: $serverNames
description: Returns the names of the first 10 servers in which the bot is present, separated by a comma and a space.
---

# $serverNames[] — Names of All Servers

`$serverNames[]` returns the names of the Discord servers where the bot is installed, **limited to the first 10** of the list returned by Discord.

## Syntax

```
$serverNames
```

## Parameters

None.

## Return Value

- **Type**: `string`
- A string containing the names of at most 10 servers, separated by `", "` (e.g., `"Server A, Server B, Server C"`).
- An empty string if the bot is on no server.

## Examples

### Simple display

```bdfd
$sendMessage[🌐 First servers: $serverNames]
```

### Embed list of servers

```bdfd
$title[🌐 Servers of the Bot]
$description[$serverNames]
$footer[Total: $serverCount servers (10 listed at most)]
$color[#5865F2]
```

### Check a name in the listed servers

```bdfd
$if[$checkContains[$serverNames;Gaming Community]==true]
$sendMessage[✅ The bot is indeed on the Gaming Community!]
$else
$sendMessage[❌ The bot is not on the Gaming Community.]
$endif
```

### Statistics with server list

```bdfd
$title[📊 Bot Statistics]
$addField[🌐 Total servers;$serverCount;yes]
$addField[📋 First 10 servers;$serverNames;no]
$addField[🔢 Shard;$shardID;yes]
$color[#2ECC71]
```

## Notes

- Only the first 10 servers are listed, whatever the real number of servers; use `$serverCount` for the total.
- The names are separated by `", "` (comma + space).
- `$checkContains` on this list can only find names that are among the first 10 servers, and it also matches partial names.
