---
layout: doc
title: $editChannelPerms
translation_key: docs
category: "Moderation"
function_name: editChannelPerms
syntax: $editChannelPerms[channelID;roleOrUserID;permission1;(permission2);...]
description: Modifies the permissions of a role or a user on a specific channel using permission names prefixed with + (allow) or - (deny).
---

# $editChannelPerms

The `$editChannelPerms[]` function **modifies the permission overwrites of a role or user** on a channel. Each permission is given by name, prefixed with `+` (allow) or `-` (deny). Numerical bitfields are not accepted.

## Syntax

```
$editChannelPerms[channelID;roleOrUserID;permission1;(permission2);...]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the target channel (positive integer). |
| `roleOrUserID` | Required. The ID of the role or the user (the type is detected automatically). If empty, the target is the @everyone overwrite. |
| `permission1` | Required. A permission name with a mandatory `+` or `-` prefix, e.g. `+sendMessages`, `-viewChannel`. |
| `permission2;...` | *(Optional)* Any number of additional prefixed permissions. |

At least 3 arguments are required; there is no upper limit.

## Return value

An empty string.

## Behavior

- The bot needs `Manage Roles` in the target channel (plus `Connect` for a voice or stage channel), computed with the channel overwrites; otherwise an error is raised. Threads are not supported.
- Only the permissions listed in the call are changed: the other flags already set in the existing overwrite are kept.
- The target type is detected: if the ID is a role of the server (the server ID is the @everyone role) it is a role overwrite, otherwise the ID must be a member of the server.
- Each permission must start with `+` (allow) or `-` (deny), otherwise the error "Permission requires an explicit +, - or supported / prefix." is raised. The `/` (neutral) prefix is not supported by `$editChannelPerms`.
- Names are case-insensitive and ignore non-alphanumeric characters (e.g. `sendMessages`, `send_messages`). An unknown name raises "Unknown permission: <name>.".
- Known aliases include `admin`, `ban`, `kick`, `changeNicknames`, `manageServer`, `manageEmojis`, `readMessages` (= `viewChannel`), `slashCommands`, `tts`, `useVAD`, `voiceMute`, `voiceDeafen`, `externalEmojis`, `externalStickers`.
- If the same permission is listed twice, the last occurrence wins.

## Examples

### Locking a channel

```bdfd
$editChannelPerms[$channelID;;-sendMessages]
$sendMessage[Channel locked: messages disabled for @everyone.]
```

### Unlocking a channel

```bdfd
$editChannelPerms[$channelID;;+sendMessages]
$sendMessage[Channel unlocked.]
```

### Private channel by role

```bdfd
$editChannelPerms[$channelID;;-viewChannel]
$editChannelPerms[$channelID;123456789012345678;+viewChannel]
$sendMessage[Channel made private for the VIP role.]
```

## Notes

- Several permissions can be changed in one call: `$editChannelPerms[$channelID;123456789012345678;+viewChannel;+sendMessages;-manageMessages]`.
- An empty `roleOrUserID` targets @everyone (a local convention of this engine).
- `$modifyChannelPerms[]` is a separate (deprecated) function with a different argument order (`channelID;permissions;roleOrUserID`).
