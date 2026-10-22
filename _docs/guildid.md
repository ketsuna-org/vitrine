---
layout: doc
title: $guildID[]
translation_key: docs
category: "Entity Info"
function_name: guildID
syntax: $guildID[(Server name)]
description: Returns the unique identifier (Snowflake) of the current Discord server, or of a server of the bot found by its name.
---

# $guildID[] — Server Identifier (Alias)

`$guildID[]` returns the unique identifier (Snowflake) of the current Discord server. With a server name, it looks up one of the servers the bot is in and returns its ID.

## Syntax

```
$guildID[(Server name)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Server name` | Optional. The name of a server the bot is in. The exact name is tried first, then the same name without regard to case. If omitted or empty (`$guildID`, `$guildID[]`), the current server is used. |

## Return Value

- **Type**: `string`
- Without a name: the value of the `guild.id` context variable supplied by the host (the ID of the current server), or an empty string if the host supplied none.
- With a name: the ID of the first matching server, or an empty string if no server of the bot has that name.

## Examples

### Simple Display

```bdfd
$sendMessage[Server ID: $guildID]
```

### Per-Server Command Restriction

```bdfd
$if[$guildID!=123456789012345678]
$sendMessage[⛔ This command is reserved for the main server.]
$stop
$endif
$sendMessage[✅ Command executed.]
```

### Find a server by name

```bdfd
$sendMessage[ID of Gaming Community: $guildID[Gaming Community]]
```

### Logs

```bdfd
$log[Action on server $guildID ($guildName)]
```

### URL Construction

```bdfd
$sendMessage[Server link: https://discord.com/channels/$guildID]
```

## Notes

- Without a name, `$guildID` returns the same value as `$serverID`, which takes no argument.
- In a DM the host does not supply a server ID, so the result is empty.
