---
layout: doc
title: $afkChannelID[]
translation_key: docs
category: "Entity Info"
function_name: afkChannelID
syntax: $afkChannelID
description: Returns the ID of the AFK channel configured on the current Discord server. Raises an error if the server has none.
---

# $afkChannelID[] — AFK Channel

`$afkChannelID[]` returns the ID of the AFK channel configured on the server where the command runs (the `afk_channel_id` setting of the server).

## Syntax

```
$afkChannelID
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| None | | |

## Return value

- **Type**: `string`
- The ID of the AFK channel.
- If the server has no AFK channel, the function does **not** return an empty string: it raises the error `No AFK channel set in this server.`
- Outside a server (no guild in the context) the lookup fails with `Guild channel settings require a guild.`

## Examples

### Displaying the AFK channel

```bdfd
$try
$sendMessage[💤 AFK Channel: <#$afkChannelID> (delay: $afkTimeout seconds)]
$catch
$sendMessage[ℹ️ No AFK channel is configured on this server.]
$endTry
```

### Configuration log

```bdfd
$log[Server configuration $serverName | AFK: $afkChannelID | Timeout: $afkTimeout]
```

## Notes

- Because an unset channel raises an error, wrap the call in `$try` / `$catch` / `$endTry` when the server may not have one.
- The inactivity delay is given by `$afkTimeout[]` (in seconds).
- Similar functions: `$rulesChannelID` and `$systemChannelID`, which raise the same kind of error when the channel is not set.
