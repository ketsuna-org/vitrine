---
layout: doc
title: $onlyForChannels
translation_key: docs
category: "Moderation"
function_name: onlyForChannels
syntax: $onlyForChannels[channelID1;channelID2;...;(errorMessage)]
description: A guard function that stops execution if the command is not executed in one of the specified channels.
---

# $onlyForChannels

The guard function `$onlyForChannels` limits the execution of a command to one or several specific Discord channels. If the command is executed elsewhere, execution is halted.

## Syntax

```
$onlyForChannels[channelID1;channelID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | The IDs of the allowed channels, separated by `;`. |
| `errorMessage` | String (optional) | The message sent if the channel is not allowed. |

## Behavior

- Compares the ID of the current channel with the provided list.
- If the channel is in the list, the command continues normally.
- If the channel is **not** in the list, the command execution is halted.
- Useful for creating dedicated channels (e.g., `#commands` or `#bots`).

## Examples

### Dedicated command channel

```bdfd
$onlyForChannels[123456789012345678;❌ Please use this command in <#123456789012345678>.]
$sendMessage[Processing...]
```

### Multiple allowed channels

```bdfd
$onlyForChannels[111111111111111111;222222222222222222;333333333333333333;❌ Channel not allowed.]
$clear[50]
```

### Without error message

```bdfd
$onlyForChannels[123456789012345678]
$ban[$mentioned[1]]
```

## Notes

- Enable Discord **Developer Mode** to easily copy channel IDs.
- `$onlyForChannels` acts as a **whitelist** (allows specific channels). For a **blacklist** (blocking specific channels), use `$ignoreChannels`.
- To restrict a command to an entire category, use `$onlyForCategories`.
- Combine with `$onlyForServers` to restrict commands to certain servers and specific channels.
