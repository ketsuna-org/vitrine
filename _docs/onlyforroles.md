---
layout: doc
title: $onlyForRoles
translation_key: docs
category: "Moderation"
function_name: onlyForRoles
syntax: $onlyForRoles[roleID1;roleID2;...;(errorMessage)]
description: A guard function that stops execution if the user does not possess any of the specified roles.
---

# $onlyForRoles

The guard function `$onlyForRoles` checks if the user has **at least one** of the specified Discord roles. If the user does not have any of these roles, the command execution is halted.

## Syntax

```
$onlyForRoles[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | The IDs of the allowed roles, separated by `;`. |
| `errorMessage` | String (optional) | The message sent if the user has none of the roles. |

## Behavior

- Checks the roles of the triggering user.
- The check is an **OR** operation: the user only needs to have at least one of the listed roles.
- If the user has at least one role from the list, the command continues.
- If the user has **none** of the listed roles, the command execution is halted.

## Examples

### Command reserved for moderators

```bdfd
$onlyForRoles[123456789012345678;❌ Only moderators can use this command.]
$mute[$mentioned[1];Reason]
$sendMessage[$mentioned[1] was muted.]
```

### Multiple allowed roles (Mod or Admin)

```bdfd
$onlyForRoles[111111111111111111;222222222222222222;❌ Insufficient permissions.]
$clear[100]
```

### Staff command with redirect message

```bdfd
$onlyForRoles[123456789012345678;❌ Command reserved for staff. Please open a ticket for any inquiries.]
$sendMessage[Welcome to the staff panel.]
```

## Notes

- The check is an **OR** check (a single role is enough), unlike `$onlyPerms` which performs an **AND** operation on permissions.
- To check by role name dynamically, use `$hasRole[$authorID;Role Name]`.
- `$onlyForRoleIDs` is an alias of `$onlyForRoles`.
- To blacklist roles, use `$blacklistRoles` or `$blacklistRoleIDs`.
- Combine with `$onlyForChannels` to restrict a command by both role and channel.
