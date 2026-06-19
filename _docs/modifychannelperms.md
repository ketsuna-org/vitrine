---
layout: doc
title: $modifyChannelPerms
translation_key: docs
category: "Moderation"
function_name: modifyChannelPerms
syntax: $modifyChannelPerms[channelID;roleOrUserID;permissions]
description: Modifies the permissions of a role or user in a channel using readable permission names (sendmessages, viewchannel, etc.).
---

# $modifyChannelPerms

The function `$modifyChannelPerms` allows you to modify the permissions of a role or user in a channel using a readable syntax.

## Syntax

```
$modifyChannelPerms[channelID;roleOrUserID;permissions]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the target channel. |
| `roleOrUserID` | The ID of the role or the user. |
| `permissions` | Permissions prefixed with `+` (allow) or `-` (deny). Example: `+sendmessages -attachfiles`. |

## Return Value

This function does not return any value.

## Behavior

- More readable than `$editChannelPerms[]` thanks to permission names.
- Available permissions: `viewchannel`, `sendmessages`, `managemessages`, `embedlinks`, `attachfiles`, `readmessagehistory`, `mentioneveryone`, `useexternalemojis`, `connect`, `speak`, `mute`, `deafen`, `move`, `usevad`, `priorityspeaker`, `stream`, etc.
- The bot must have `MANAGE_CHANNELS` or `MANAGE_ROLES` permissions.

## Examples

### VIP Private Channel

```bdfd
$modifyChannelPerms[$channelID;$guildID;-viewchannel]
$modifyChannelPerms[$channelID;$vipRoleID;+viewchannel +sendmessages]
$sendMessage[VIP Channel configured.]
```

### Fast Lockdown

```bdfd
$modifyChannelPerms[$channelID;$guildID;-sendmessages]
$sendMessage[🔒 Channel locked.]
```

### Unlocking

```bdfd
$modifyChannelPerms[$channelID;$guildID;+sendmessages]
$sendMessage[🔓 Channel unlocked.]
```

### Mixed Permissions

```bdfd
$modifyChannelPerms[$channelID;$mutedRoleID;-sendmessages -speak -connect]
$sendMessage[Permissions of the muted role applied.]
```

## Notes

- `$modifyChannelPerms` is recommended because it is more readable than `$editChannelPerms[]`.
- `$guildID` represents `@everyone`.
- Permissions that are not mentioned remain unchanged.
