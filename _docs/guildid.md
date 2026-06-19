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
- The ID of the server as a numeric string.

## Usage

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

- `$guildID[]` is strictly identical to `$serverID[]`. Use whichever feels more natural.
- The term "guild" is the technical name used by the Discord API to refer to a server.
- The ID is permanent and never changes, unlike the name.
