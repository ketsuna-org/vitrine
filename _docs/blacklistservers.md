---
layout: doc
title: $blacklistServers
translation_key: docs
category: "Moderation"
function_name: blacklistServers
syntax: $blacklistServers[guildID1;guildID2;...;(errorMessage)]
description: Guard function that blacklists servers. If the command is executed on a blacklisted server, it is interrupted.
---

# $blacklistServers

The guard function `$blacklistServers` blocks the execution of the command on the listed servers. If the command is executed on a blacklisted server, it is interrupted.

## Syntax

```
$blacklistServers[guildID1;guildID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `guildID1;guildID2;...` | Snowflake[] | IDs of servers to blacklist. |
| `errorMessage` | String (optional) | Message sent if the server is blacklisted. |

## Behavior

- Compares the ID of the current server (`$guildID`/`$serverID`) with the list.
- If the server is in the list, the command is interrupted.
- If an error message is provided, it is sent; otherwise, it remains silent.

## Examples

### Block a server

```bdfd
$blacklistServers[123456789012345678;❌ Command disabled on this server.]
$sendMessage[Command executed.]
```

### Multi-server blacklist

```bdfd
$blacklistServers[111111111111111111;222222222222222222]
$sendMessage[OK.]
```

### Dynamic blacklist via variable

```bdfd
$blacklistServers[$getGlobalVar[blacklistedServers];❌ Server blacklisted.]
$sendMessage[Welcome.]
```

## Notes

- To whitelist servers (only allow certain servers), use `$onlyForServers`.
- Server blacklisting is useful for public bots to disable commands on problematic servers.
- Combine it with global variables to manage the blacklist dynamically without modifying the code.
