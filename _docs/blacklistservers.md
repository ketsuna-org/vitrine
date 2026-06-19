---
layout: doc
title: $blacklistServers
translation_key: docs
category: "Moderation"
function_name: blacklistServers
syntax: $blacklistServers[guildID1;guildID2;...;(errorMessage)]
description: Function guard qui blacklist servers. If the command est executede in a server blacklisté, it is interrompue.
---

# $blacklistServers

The function guard `$blacklistServers` bloque l'execution of the command in thes servers listés. If the command est executede in a server blacklisté, it is interrompue.

## Syntax

```
$blacklistServers[guildID1;guildID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `guildID1;guildID2;...` | Snowflake[] | IDs servers to blacklistr. |
| `errorMessage` | String (optional) | Message if the server est blacklisté. |

## Behavior

- Compare the ID of the server courant (`$guildID`/`$serverID`) with the list.
- If the server est in the list, la command est interrompue.
- If a message error is provided, il is sent ; otherwise, silence.

## Examples

### Bloquer a server

```bdfd
$blacklistServers[123456789012345678;❌ Command désenablede on ce server.]
$sendMessage[Command executede.]
```

### Blacklist multi-servers

```bdfd
$blacklistServers[111111111111111111;222222222222222222]
$sendMessage[OK.]
```

### Blacklist dynamic via variable

```bdfd
$blacklistServers[$getGlobalVar[blacklistdServers];❌ Server blacklisté.]
$sendMessage[Bienvenue.]
```

## Notes

- Pour whitelistr servers (autoriser only certains servers), use `$onlyForServers`.
- La blacklist of server est utile for bots publics in order to désenable commands on servers problématiques.
- Combinez with of variables globals to manage la blacklist dynamicment without modifier the code.
