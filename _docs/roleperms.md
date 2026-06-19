---
layout: doc
title: $rolePerms
translation_key: docs
category: "Entity Info"
function_name: rolePerms
syntax: $rolePerms[roleID;(guildID)]
description: Returns the permissions of a Discord role as a text list or a raw value.
---

# $rolePerms

The function `$rolePerms` returns the **permissions** of a Discord role, either as a text list or as a raw integer value.

## Syntax

```
$rolePerms[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the target server. |

## Return Value

| Type | Description |
|---|---|
| `string` | The list of permissions of the role. |

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
| `ReadMessages` | View channels |
| `Connect` | Connect to voice channels |

## Examples

### Display permissions

```bdfd
$sendMessage[Permissions of the Admin role: $rolePerms[$roleID[Admin]]]
```

### Check a permission

```bdfd
$if[$checkContains[$rolePerms[$roleID[Member]];Administrator]]
  $sendMessage[⚠️ The Member role has the Administrator permission!]
$else
  $sendMessage[Standard permissions.]
$endif
```

### Check if a role can manage messages

```bdfd
$if[$checkContains[$rolePerms[$roleID[Mod]];ManageMessages]]
  $sendMessage[Moderators can manage messages.]
$endif
```

### Formatted list

```bdfd
$sendMessage[**Permissions of $roleName[$roleID[Admin]]:**
$rolePerms[$roleID[Admin]]]
```

## Notes

- The exact format may vary depending on the version of BDFD.
- To obtain the raw integer value, use `$roleInfo[ID;permissions]`.
- Use with `$checkContains` to test for specific permissions.
