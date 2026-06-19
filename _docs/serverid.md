---
layout: doc
title: $serverID[]
translation_key: docs
category: "Entity Info"
function_name: serverID
syntax: $serverID
description: Returns the unique identifier (Snowflake) of the Discord server where the command was executed.
---

# $serverID[] — Server Identifier

`$serverID[]` returns the unique identifier (Snowflake) of the current Discord server. This ID is an 18-19 digit number that permanently identifies the server.

## Syntax

```
$serverID
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The ID of the server in the form of a numeric string.

## Usage

### Display the ID

```bdfd
$sendMessage[ID of the server: $serverID]
```

### Restrict a command to a specific server

```bdfd
$if[$serverID!=123456789012345678]
  $sendMessage[This command is not available on this server.]
  $stop
$endif
$sendMessage[Command executed successfully!]
```

### Logs with identifier

```bdfd
$log[Action performed on server $serverID ($serverName)]
```

### Link to a channel of the server

```bdfd
$sendMessage[Join the general channel: https://discord.com/channels/$serverID/$channelID[general]]
```

## Notes

- `$serverID[]` is an alias of `$guildID[]`.
- The ID is invariant: it never changes, unlike the name of the server.
- Useful for reliably identifying a server in conditions and logs.
- Can be used to construct Discord URLs (channels, messages, etc.).
