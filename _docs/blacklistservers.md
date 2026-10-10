---
layout: doc
title: $blacklistServers
translation_key: docs
category: "Moderation"
function_name: blacklistServers
syntax: $blacklistServers[guildID1;guildID2;...;errorMessage]
description: Guard function that blacklists servers. If the command is executed on a blacklisted server, it is interrupted.
---

# $blacklistServers

The guard function `$blacklistServers` blocks the execution of the command on the listed servers. If the command is executed on a blacklisted server, it is interrupted.

## Syntax

```
$blacklistServers[guildID1;guildID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `guildID1;guildID2;...` | Snowflake[] | IDs of servers to blacklist. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the ID of the current server (`guild.id`, i.e. `$guildID`) with each value (trimmed text comparison).
- If the server is in the list, the script is stopped and the error message is used as output.
- If it is not, the command continues.
- Empty values never match.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Block a server

```bdfd
$blacklistServers[123456789012345678;❌ Command disabled on this server.]
$sendMessage[Command executed.]
```

### Multi-server blacklist, silent stop

```bdfd
$blacklistServers[111111111111111111;222222222222222222;]
$sendMessage[OK.]
```

## Notes

- To whitelist servers (only allow certain servers), use `$onlyForServers`.
- Server blacklisting is useful for public bots to disable commands on problematic servers.
