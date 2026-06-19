---
layout: doc
title: $ignoreChannels
translation_key: docs
category: "Moderation"
function_name: ignoreChannels
syntax: $ignoreChannels[channelID1;channelID2;...]
description: A function guard that silently ignores command execution if it is triggered in one of the listed channels.
---

# $ignoreChannels

The function guard `$ignoreChannels` **silently** interrupts the execution of the command if it is used in one of the specified channels. Unlike `$onlyForChannels` which acts as a whitelist, `$ignoreChannels` acts as a **blacklist** of channels.

## Syntax

```
$ignoreChannels[channelID1;channelID2;...]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | Channel IDs to ignore, separated by `;`. |

## Behavior

- If the current channel is in the list, the command execution is stopped **without any message** (total silence).
- If the channel is not in the list, the command continues normally.
- No error message is supported — the guard is strictly silent.

## Examples

### Restricting commands in general discussion channels

```bdfd
$ignoreChannels[123456789012345678]
$sendMessage[Moderation command executed.]
```

### Multiple blacklisted channels

```bdfd
$ignoreChannels[111111111111111111;222222222222222222;333333333333333333]
$ban[$mentioned[1]]
```

### Ignore announcement channels

```bdfd
$ignoreChannels[123456789012345678;987654321098765432]
$sendMessage[Action completed.]
```

## Notes

- `$ignoreChannels` is a silent **blacklist**. For a **whitelist** with an error message, use `$onlyForChannels`.
- No error message is sent to the user. If you want to notify the user, use `$onlyForChannels` with an error message.
- Place this at the beginning of the command, before any other logic.
- Convenient for disabling commands in specific channels without spamming users.
