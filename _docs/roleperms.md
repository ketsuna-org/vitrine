---
layout: doc
title: $rolePerms
translation_key: docs
category: "Entity Info"
function_name: rolePerms
syntax: $rolePerms[guildID;roleID;(separator)]
description: Returns the permissions of a Discord role as a text list.
---

# $rolePerms

The function `$rolePerms` returns the **permissions** of a Discord role, as a text list of permission names.

## Syntax

```
$rolePerms[guildID;roleID;(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | The ID of the server containing the role. Required. |
| `roleID` | The ID of the role. Required. |
| `separator` | Optional. Text placed between permission names (a space is always added after it). Default: `,`. |

## Return Value

| Type | Description |
|---|---|
| `string` | The permission names of the role (for example `SendMessages, ViewChannel`), or `No Permissions` if the role has none. An invalid guild ID, an invalid role ID or an unknown role raises an error. |

## Common Permissions

| Permission | Description |
|---|---|
| `Administrator` | All permissions |
| `ManageGuild` | Manage the server |
| `ManageRoles` | Manage roles |
| `ManageChannels` | Manage channels |
| `KickMembers` | Kick members |
| `BanMembers` | Ban members |
| `ManageMessages` | Manage messages |
| `MentionEveryone` | Mention @everyone |
| `SendMessages` | Send messages |
| `ViewChannel` | View channels |
| `Connect` | Connect to voice channels |

## Examples

### Display permissions

```bdfd
$sendMessage[Permissions of the Admin role: $rolePerms[$guildID;$roleID[Admin]]]
```

### Check a permission

```bdfd
$if[$checkContains[$rolePerms[$guildID;$roleID[Member]];Administrator]==true]
  $sendMessage[⚠️ The Member role has the Administrator permission!]
$else
  $sendMessage[Standard permissions.]
$endif
```

### Check if a role can manage messages

```bdfd
$if[$checkContains[$rolePerms[$guildID;$roleID[Mod]];ManageMessages]==true]
  $sendMessage[Moderators can manage messages.]
$endif
```

### Formatted list

```bdfd
$sendMessage[**Permissions of $roleName[$roleID[Admin]]:**
$rolePerms[$guildID;$roleID[Admin]]]
```

## Notes

- Names are listed in a fixed order (CreateInvite, KickMembers, BanMembers, Administrator, ...); the raw integer value is not available.
- The flags stored on the role are listed: `Administrator` is shown when it is set, but it is not expanded into every other permission.
- The role must belong to the server `guildID`, otherwise `Role not found.` is raised.
- Use with `$checkContains` to test for specific permissions (the comparison is case-sensitive).
