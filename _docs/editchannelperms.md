---
layout: doc
title: $editChannelPerms
translation_key: docs
category: "Moderation"
function_name: editChannelPerms
syntax: $editChannelPerms[channelID;roleOrUserID;allow;deny]
description: Modifies the permissions of a role or a user on a specific channel using numerical permission values.
---

# $editChannelPerms

The `$editChannelPerms[]` function **modifies the permissions of a role or user** on a channel using numerical values (bitfields).

## Syntax

```
$editChannelPerms[channelID;roleOrUserID;allow;deny]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the target channel. |
| `roleOrUserID` | The ID of the role or the user. |
| `allow` | Bitfield of permissions to allow (integer). |
| `deny` | Bitfield of permissions to deny (integer). |

## Return value

This function does not return a value.

## Behavior

- The bot must have `MANAGE_ROLES` or `MANAGE_CHANNELS` permission.
- Permissions are defined by numerical values:
  - `1024` = View channel
  - `2048` = Send messages
  - `4096` = Send TTS messages
  - `8192` = Manage messages
  - `16384` = Embed links
  - etc.

## Examples

### Locking a channel

```bdfd
$editChannelPerms[$channelID;$guildID;0;2048]
$sendMessage[Channel locked: messages disabled for @everyone.]
```

### Unlocking a channel

```bdfd
$editChannelPerms[$channelID;$guildID;2048;0]
$sendMessage[Channel unlocked.]
```

### Private channel by role

```bdfd
$editChannelPerms[$channelID;$guildID;0;1024]
$editChannelPerms[$channelID;$vipRoleID;1024;0]
$sendMessage[Channel made private for the VIP role.]
```

## Notes

- The `allow` and `deny` permissions are sums of flags. Add the values together to combine permissions.
- `$guildID` represents the @everyone role.
- For a more readable approach, use `$modifyChannelPerms[]`.
