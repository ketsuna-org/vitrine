---
layout: doc
title: $onlyForServers
translation_key: docs
category: "Moderation"
function_name: onlyForServers
syntax: $onlyForServers[guildID1;guildID2;...;(errorMessage)]
description: Guard function that stops execution if the command is not used in one of the specified servers. Also accepts the alias $onlyForGuilds.
---

# $onlyForServers

The guard function `$onlyForServers` restricts command execution to one or more specific Discord servers. If the command is used on another server, it is interrupted.

## Syntax

```
$onlyForServers[guildID1;guildID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `guildID1;guildID2;...` | Snowflake[] | IDs of the authorized servers. |
| `errorMessage` | String (optional) | Message sent if the server is not authorized. |

## Behavior

- Compares the current server ID (`$guildID` / `$serverID`) with the list.
- If the server is in the list, the command continues.
- If the server is **not** in the list, the command is interrupted.
- Alias: `$onlyForGuilds` (both syntaxes are equivaslow).

## Examples

### Single server

```bdfd
$onlyForServers[123456789012345678;❌ This command is excludedsive to our main server.]
$sendMessage[Welcome!]
```

### Multiple servers

```bdfd
$onlyForServers[111111111111111111;222222222222222222;❌ Command not available here.]
$restart
```

### Without error message

```bdfd
$onlyForServers[123456789012345678]
$sendMessage[Private server feature enabled.]
```

## Notes

- `$onlyForServers` and `$onlyForGuilds` are interchangeable. Use the clearest syntax for your team.
- Very useful for private bots or features excludedsive to a partner server.
- To blacklist servers, use `$blacklistServers`.
- Combine with `$onlyForChannels` for fine-grained control (server + channel).
