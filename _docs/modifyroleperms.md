---
layout: doc
title: $modifyRolePerms
translation_key: docs
category: "Moderation"
function_name: modifyRolePerms
syntax: $modifyRolePerms[roleID;permissions]
description: Modifies the permissions of an existing role.
---

# $modifyRolePerms

The function `$modifyRolePerms` **modifies the permissions** of an existing role on the Discord server. The bot must have the `ManageRoles` permission.

## Syntax

```
$modifyRolePerms[roleID;permissions]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to modify. Required. |
| `permissions` | List of permissions in the format `permission=value`, separated by `;`. Required. |

## Return Value

None. The permissions of the role are updated.

## Examples

### Disabling sending of messages

```bdfd
$modifyRolePerms[$roleID[Muted];sendmessages=no;sendmessagesinthreads=no]
$sendMessage[✅ The Muted role can no longer send messages.]
```

### Enabling moderation permissions

```bdfd
$modifyRolePerms[$roleID[Mod];banmembers=yes;kickmembers=yes;managemessages=yes]
$sendMessage[✅ Moderation permissions enabled for the Mod role.]
```

### Restricting a role

```bdfd
$modifyRolePerms[$roleID[Restricted];sendmessages=no;connect=no;speak=no]
$sendMessage[✅ Restricted role configured.]
```

### Permission management command

```bdfd
$if[$isAdmin==true]
  $modifyRolePerms[$roleID[$message[1]];$message[2]]
  $sendMessage[Permissions updated.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- The bot must have the `ManageRoles` permission.
- Permission format: `permission=yes` or `permission=no`.
- Permissions are separated by `;`.
- To modify role properties (name, color), use `$modifyRole`.
- To view the current permissions of a role, use `$rolePerms`.
- Permissions that are not specified remain unchanged.
