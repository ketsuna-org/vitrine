---
layout: doc
title: $onlyForServers
translation_key: docs
category: "Moderation"
function_name: onlyForServers
syntax: $onlyForServers[guildID1;guildID2;...;errorMessage]
description: Guard function that stops execution if the command is not used in one of the specified servers.
---

# $onlyForServers

The guard function `$onlyForServers` restricts command execution to one or more specific Discord servers. If the command is used on another server, it is interrupted.

## Syntax

```
$onlyForServers[guildID1;guildID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `guildID1;guildID2;...` | Snowflake[] | IDs of the authorized servers. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the current server ID (`guild.id`, i.e. `$guildID`) with each value (trimmed text comparison).
- If the server is in the list, the command continues.
- If the server is **not** in the list (or the list contains only empty values), the script is stopped and the error message is used as output.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Single server

```bdfd
$onlyForServers[123456789012345678;❌ This command is exclusive to our main server.]
$sendMessage[Welcome!]
```

### Multiple servers

```bdfd
$onlyForServers[111111111111111111;222222222222222222;❌ Command not available here.]
$sendMessage[Available here.]
```

### Silent stop

```bdfd
$onlyForServers[123456789012345678;]
$sendMessage[Private server feature enabled.]
```

## Notes

- Very useful for private bots or features exclusive to a partner server.
- To blacklist servers, use `$blacklistServers`.
- Combine with `$onlyForChannels` for fine-grained control (server + channel).
