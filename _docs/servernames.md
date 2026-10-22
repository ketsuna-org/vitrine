---
layout: doc
title: $serverNames[]
translation_key: docs
category: "Entity Info"
function_name: serverNames
syntax: $serverNames[(Amount;Separator)]
description: Returns the names of the servers in which the bot is present (10 by default, -1 for all), separated by a comma and a space unless a separator is given.
---

# $serverNames[] — Names of All Servers

`$serverNames[]` returns the names of the Discord servers where the bot is installed, in the order returned by Discord. By default only the **first 10** are listed; the amount and the separator can be chosen.

## Syntax

```
$serverNames[(Amount;Separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Amount` | Optional. The number of names to return: a whole number, or `-1` for every server. If omitted or empty, 10. Any other value raises `Amount must be a whole number, or -1 for every server.` |
| `Separator` | Optional. The text placed between names. If omitted, `", "` (comma + space). Given empty, the names are joined with nothing. |

## Return Value

- **Type**: `string`
- A string containing the names of the first `Amount` servers (10 by default), separated by the separator (`", "` by default, e.g., `"Server A, Server B, Server C"`).
- An empty string if the bot is on no server.

## Examples

### Simple display

```bdfd
$sendMessage[🌐 First servers: $serverNames]
```

### All servers, custom separator

```bdfd
$sendMessage[$serverNames[-1; | ]]
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

- Without an amount, only the first 10 servers are listed, whatever the real number of servers; use `$serverCount` for the total, or `$serverNames[-1]` to list them all.
- `$checkContains` on this list can only find names that are among the listed servers, and it also matches partial names.
