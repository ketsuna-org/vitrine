---
layout: doc
title: $onlyForRoleIDs
translation_key: docs
category: "Moderation"
function_name: onlyForRoleIDs
syntax: $onlyForRoleIDs[roleID1;roleID2;...;errorMessage]
description: A guard function that stops execution if the user does not possess any of the specified roles, compared by role ID.
---

# $onlyForRoleIDs

The guard function `$onlyForRoleIDs` checks if the user has **at least one** of the specified roles, identified by their **ID**. It is the ID variant of `$onlyForRoles`, which compares role names.

## Syntax

```
$onlyForRoleIDs[roleID1;roleID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | The IDs of the allowed roles. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the values with the **ID** of each role of the user (each value must be a valid Discord ID, otherwise an error "Invalid Discord ID." is raised). The `@everyone` role (whose ID is the server ID) counts as a role of the user.
- The match is an **OR**: a single matching role is enough.
- If the user has at least one matching role, the command continues.
- If the user has none (or all values are empty), the script is stopped and the error message is used as output.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Staff command

```bdfd
$onlyForRoleIDs[123456789012345678;❌ Reserved for staff.]
$sendMessage[Staff panel.]
```

### Multi-roles

```bdfd
$onlyForRoleIDs[111111111111111111;222222222222222222;❌ Access denied.]
$sendMessage[Access granted.]
```

### Silent stop

```bdfd
$onlyForRoleIDs[123456789012345678;]
$sendMessage[Staff only.]
```

## Notes

- `$onlyForRoleIDs` compares role IDs; `$onlyForRoles` compares role names.
- To blacklist roles by ID, use `$blacklistRolesIDs`.
- To allow specific users instead of roles, use `$onlyForIDs`.
