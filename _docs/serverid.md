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

`$serverID[]` returns the identifier (Snowflake) of the current Discord server.

## Syntax

```
$serverID
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The value of the `guild.id` context variable supplied by the host (the ID of the current server), or an empty string if the host supplied none.

## Examples

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
$sendMessage[Join the general channel: https://discord.com/channels/$serverID/$channelIDFromName[general]]
```

## Notes

- `$serverID` and `$guildID` read the same `guild.id` value and both accept no argument.
- Can be used to construct Discord URLs (channels, messages, etc.).
