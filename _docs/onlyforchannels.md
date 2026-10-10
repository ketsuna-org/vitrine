---
layout: doc
title: $onlyForChannels
translation_key: docs
category: "Moderation"
function_name: onlyForChannels
syntax: $onlyForChannels[channelID1;channelID2;...;errorMessage]
description: A guard function that stops execution if the command is not executed in one of the specified channels.
---

# $onlyForChannels

The guard function `$onlyForChannels` limits the execution of a command to one or several specific Discord channels. If the command is executed elsewhere, execution is halted.

## Syntax

```
$onlyForChannels[channelID1;channelID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | The IDs of the allowed channels, separated by `;`. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the ID of the current channel (`channel.id`) with each value (trimmed text comparison).
- If the channel is in the list, the command continues normally.
- If the channel is **not** in the list (or the list contains only empty values), the script is stopped and the error message is used as output.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Dedicated command channel

```bdfd
$onlyForChannels[123456789012345678;❌ Please use this command in <#123456789012345678>.]
$sendMessage[Processing...]
```

### Multiple allowed channels

```bdfd
$onlyForChannels[111111111111111111;222222222222222222;333333333333333333;❌ Channel not allowed.]
$sendMessage[Allowed channel.]
```

### Silent stop

```bdfd
$onlyForChannels[123456789012345678;]
$sendMessage[Moderation channel.]
```

## Notes

- Enable Discord **Developer Mode** to easily copy channel IDs.
- `$onlyForChannels` acts as a **whitelist**. For a **blacklist**, use `$ignoreChannels`.
- To restrict a command to an entire category, use `$onlyForCategories`.
- Combine with `$onlyForServers` to restrict commands to certain servers and specific channels.
