---
layout: doc
title: $modifyRolePerms
translation_key: docs
category: "Moderation"
function_name: modifyRolePerms
syntax: $modifyRolePerms[roleID;permission1;(permission2);...]
description: Toggles the listed permissions of an existing role.
---

# $modifyRolePerms

The function `$modifyRolePerms` **toggles permissions** of an existing role: each listed permission that the role has is removed, and each permission that it does not have is added. There is no `permission=yes` / `permission=no` syntax.

## Syntax

```
$modifyRolePerms[roleID;permission1;(permission2);...]
```

At least 2 arguments are required; there is no upper limit.

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to modify. Required; if it is not a positive number the error `Missing or invalid role ID.` is raised. |
| `permission1;(permission2);...` | One permission name per argument, without prefix or value (for example `BanMembers`). Names are case-insensitive and ignore non-alphanumeric characters; aliases such as `Admin`, `Ban`, `Kick`, `ManageServer` are accepted. An empty or unknown name raises `Invalid role permissions.` |

## Return Value

None (empty string).

## Behavior

- The current permissions of the role are read, then each listed permission is flipped (XOR). A permission written twice in the same call is flipped twice, i.e. unchanged.
- Permissions that are not listed remain unchanged.
- The bot must have `Manage Roles` and the role must be below the bot's highest role (managed roles cannot be modified); otherwise an error is raised.

## Examples

### Toggle message sending

```bdfd
$modifyRolePerms[$roleID[Muted];SendMessages;SendMessagesInThreads]
$sendMessage[✅ SendMessages and SendMessagesInThreads toggled on the Muted role.]
```

### Toggle moderation permissions

```bdfd
$modifyRolePerms[$roleID[Mod];BanMembers;KickMembers;ManageMessages]
$sendMessage[✅ Moderation permissions toggled for the Mod role.]
```

### Permission management command

```bdfd
$if[$isAdmin[$authorID]==true]
  $modifyRolePerms[$roleID[$message[1]];$message[2]]
  $sendMessage[Permission toggled.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- Because the permissions are toggled, running the same call twice restores the original permissions. Use `$rolePerms` to check the role first.
- To modify role properties (name, color), use `$modifyRole`.
