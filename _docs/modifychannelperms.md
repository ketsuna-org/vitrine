---
layout: doc
title: $modifyChannelPerms
translation_key: docs
category: "Moderation"
function_name: modifyChannelPerms
syntax: $modifyChannelPerms[channelID;permissions;roleOrUserID]
description: Deprecated variant of $editChannelPerms that takes the permission list as one argument (+ allow, - deny, / reset) and the role or user as the last argument.
---

# $modifyChannelPerms

The function `$modifyChannelPerms` modifies the permission overwrite of a role or user in a channel. The permissions are given in **one** argument, and the role or user ID comes **last**.

## Syntax

```
$modifyChannelPerms[channelID;permissions;roleOrUserID]
```

Exactly 3 arguments are required.

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the target channel (positive number). |
| `permissions` | Required. A list of permission names, each with a mandatory prefix: `+` (allow), `-` (deny) or `/` (reset to neutral). Separate them with spaces or commas, e.g. `+sendmessages -attachfiles`. |
| `roleOrUserID` | Required. The ID of the role or user whose overwrite is changed. It cannot be empty (`Permission target is required.`). Use `$guildID` for @everyone. |

## Return Value

This function does not return any value (empty string).

## Behavior

- Each token must start with `+`, `-` or `/` followed by a permission name, otherwise the error `Permission requires an explicit +, - or supported / prefix.` is raised. An unknown name raises `Unknown permission: <name>.`
- Names are case-insensitive and ignore `_`; the same names and aliases as `$editChannelPerms` are accepted (for example `sendMessages`, `viewChannel`, `muteMembers`; `mute`, `deafen` and `move` alone are **not** valid names).
- The `/` prefix removes the allow or deny flag of that permission from the overwrite. If a permission appears twice, the last occurrence wins.
- Permissions that are not mentioned remain unchanged.
- The ID is detected as a role (the server ID is @everyone) or, otherwise, as a member of the server.
- The bot needs `Manage Roles` in the channel (plus `Connect` for a voice or stage channel); otherwise an error is raised. Threads are not supported.

## Examples

### VIP Private Channel

```bdfd
$modifyChannelPerms[$channelID;-viewchannel;$guildID]
$modifyChannelPerms[$channelID;+viewchannel +sendmessages;123456789012345678]
$sendMessage[VIP Channel configured.]
```

### Fast Lockdown

```bdfd
$modifyChannelPerms[$channelID;-sendmessages;$guildID]
$sendMessage[🔒 Channel locked.]
```

### Unlocking

```bdfd
$modifyChannelPerms[$channelID;/sendmessages;$guildID]
$sendMessage[🔓 Channel unlocked.]
```

### Mixed Permissions

```bdfd
$modifyChannelPerms[$channelID;-sendmessages -speak -connect;987654321098765432]
$sendMessage[Permissions of the muted role applied.]
```

## Notes

- `$editChannelPerms` is the current form: one permission per argument, the target before the permissions, and an empty target meaning @everyone. `$modifyChannelPerms` is kept for BDFD compatibility.
- `$guildID` identifies the @everyone role.
