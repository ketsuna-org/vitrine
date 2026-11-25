---
layout: doc
title: $channelPermissions
translation_key: docs
category: "Permission"
function_name: channelPermissions
syntax: $channelPermissions[channelID;(memberOrRoleID);(separator)]
description: Lists the effective permissions of a member or a role in one channel, with the channel overwrites applied. Bot Creator function, not in BDFD.
---

# $channelPermissions

The function `$channelPermissions` **lists what a member or a role can really do in one channel**. It is not a copy of `$userPerms` (the permissions stored in the roles) or of `$checkChannelPerms` (the @everyone role only): it answers for the channel, as Discord does. This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$channelPermissions[channelID;(memberOrRoleID);(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of a channel (or thread) of a server, otherwise `Invalid Discord ID.` A thread uses the overwrites of its parent channel. |
| `memberOrRoleID` | Optional. The ID of a member or of a role of the server. Empty or absent: the member who ran the command (the bot when there is none). |
| `separator` | Optional. Text placed between two permissions. Default `, `. Kept literally, spaces included. |

## What is taken into account

1. The permissions of the `@everyone` role and of the member's roles (for a role: its own permissions and those of `@everyone`).
2. The `@everyone` overwrite of the channel, then the overwrites of the member's roles (or of the role), then the overwrite of the member himself, each with its denied and allowed permissions.
3. Administrator and the server owner: they hold every permission, whatever the overwrites.
4. A member in timeout keeps only `VIEW_CHANNEL` and `READ_MESSAGE_HISTORY`.

## Return value

- **Type**: String
- The permission names in Discord's order, as `$userPerms` writes them (`VIEW_CHANNEL`, `SEND_MESSAGES`, ...) joined by the separator. Empty when the target has none.
- An error is raised if the channel is not on a server, or if the member is not on the server.

## Examples

### Permission diagnosis

```bdfd
$sendMessage[Your permissions here: $channelPermissions[$channelID]]
```

### One member, with another separator

```bdfd
$sendMessage[Permissions of $username here: $channelPermissions[$channelID;$authorID; | ]]
```

### Access check

```bdfd
$if[$checkContains[$channelPermissions[$channelID;$roleID[Staff]];SEND_MESSAGES]==true]
  Staff can write here.
$endif
```

## Notes

- Use `$checkUserPerms` or `$hasPerms` to test named permissions, `$checkChannelPerms` for the @everyone role only.
- JavaScript: `channel.permissionsFor(memberOrRole).toArray()`.
