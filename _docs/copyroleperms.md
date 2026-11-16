---
layout: doc
title: $copyRolePerms[]
translation_key: docs
category: "Server Helpers"
function_name: copyRolePerms
syntax: $copyRolePerms[sourceRoleID;targetRoleID;(reason)]
description: "Makes the permissions of a role identical to those of another role. Only the differing permissions are changed."
---
# $copyRolePerms — Makes the permissions of a role identical to those of another role

## Syntax

```
$copyRolePerms[sourceRoleID;targetRoleID;(reason)]
```

## Parameters

- **sourceRoleID** *(ID, required)* — The role to copy.
- **targetRoleID** *(ID, required)* — The role to change. `@everyone` is refused.
- **reason** *(text, optional)* — The reason recorded in the server's audit log (up to 512 characters). Empty or absent: the reason set with `$auditLogReason`, if any.

## Return Value

- empty.

## Usage

```
$copyRolePerms[111;222]
```

## Important Notes

- The bot needs Manage Roles and its role must be above the target role.

## Example

```bdfd
$copyRolePerms[111;222]
$sendMessage[Permissions copied.]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
