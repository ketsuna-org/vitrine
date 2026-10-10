---
layout: doc
title: $ignoreChannels
translation_key: docs
category: "Moderation"
function_name: ignoreChannels
syntax: $ignoreChannels[channelID1;channelID2;...;errorMessage]
description: Guard function that stops command execution if it is triggered in one of the listed channels.
---

# $ignoreChannels

The guard function `$ignoreChannels` interrupts the execution of the command if it is used in one of the specified channels. Unlike `$onlyForChannels` which acts as a whitelist, `$ignoreChannels` acts as a **blacklist** of channels.

## Syntax

```
$ignoreChannels[channelID1;channelID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | Channel IDs to ignore, separated by `;`. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the ID of the current channel (`channel.id`) with each value (trimmed text comparison).
- If the current channel is in the list, the script is stopped and the error message is used as output. Leave the error message empty for a silent stop.
- If the channel is not in the list, the command continues normally.
- Empty values never match.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Silent stop in a channel

```bdfd
$ignoreChannels[123456789012345678;]
$sendMessage[Moderation command executed.]
```

### Multiple blacklisted channels

```bdfd
$ignoreChannels[111111111111111111;222222222222222222;333333333333333333;]
$sendMessage[Action completed.]
```

### With a message

```bdfd
$ignoreChannels[123456789012345678;987654321098765432;❌ This command is disabled here.]
$sendMessage[Action completed.]
```

## Notes

- `$ignoreChannels` is a **blacklist**. For a **whitelist**, use `$onlyForChannels`.
- The error message is required but may be empty (`;` at the end) to stop silently.
- Place this at the beginning of the command, before any other logic.
