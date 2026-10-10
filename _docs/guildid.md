---
layout: doc
title: $guildID[]
translation_key: docs
category: "Entity Info"
function_name: guildID
syntax: $guildID
description: Alias of $serverID. Returns the unique identifier (Snowflake) of the Discord server.
---

# $guildID[] — Server Identifier (Alias)

`$guildID[]` is an alias of `$serverID[]`. It returns the unique identifier (Snowflake) of the current Discord server.

## Syntax

```
$guildID
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The value of the `guild.id` context variable supplied by the host (the ID of the current server), or an empty string if the host supplied none.

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

### Logs

```bdfd
$log[Action on server $guildID ($guildName)]
```

### URL Construction

```bdfd
$sendMessage[Server link: https://discord.com/channels/$guildID]
```

## Notes

- `$guildID` and `$serverID` read the same `guild.id` value and both accept no argument.
- In a DM the host does not supply a server ID, so the result is empty.
