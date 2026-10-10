---
layout: doc
title: $onlyForRoles
translation_key: docs
category: "Moderation"
function_name: onlyForRoles
syntax: $onlyForRoles[roleName1;roleName2;...;errorMessage]
description: A guard function that stops execution if the user does not possess any of the specified roles (compared by role name).
---

# $onlyForRoles

The guard function `$onlyForRoles` checks if the user has **at least one** of the specified roles, identified by their **name**. If the user has none of them, the command execution is halted. To compare role IDs, use `$onlyForRoleIDs`.

## Syntax

```
$onlyForRoles[roleName1;roleName2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleName1;roleName2;...` | String[] | Names of the allowed roles, separated by `;`. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the values with the **name** of each role of the user (case-sensitive, values are trimmed). The `@everyone` role (whose ID is the server ID) counts as a role of the user.
- The match is an **OR**: a single matching role is enough.
- If the user has at least one matching role, the command continues.
- If the user has none (or all values are empty), the script is stopped and the error message is used as output.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Command reserved for moderators

```bdfd
$onlyForRoles[Moderator;❌ Only moderators can use this command.]
$sendMessage[Moderation panel.]
```

### Multiple allowed roles (Mod or Admin)

```bdfd
$onlyForRoles[Moderator;Admin;❌ Insufficient permissions.]
$sendMessage[Access granted.]
```

### Silent stop

```bdfd
$onlyForRoles[Staff;]
$sendMessage[Welcome to the staff panel.]
```

## Notes

- The role names are compared exactly (case-sensitive); renaming a role breaks the guard. For a stable check, use `$onlyForRoleIDs`.
- The check is an **OR** check (a single role is enough), unlike `$onlyPerms` which performs an **AND** operation on permissions.
- To blacklist roles, use `$blacklistRoles` (names) or `$blacklistRolesIDs` (IDs).
- Combine with `$onlyForChannels` to restrict a command by both role and channel.
