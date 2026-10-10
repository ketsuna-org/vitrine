---
layout: doc
title: $blacklistRolesIDs
translation_key: docs
category: "Moderation"
function_name: blacklistRolesIDs
syntax: $blacklistRolesIDs[roleID1;roleID2;...;errorMessage]
description: Guard function that blacklists roles by ID. If the user has any of the roles, the command is interrupted.
---

# $blacklistRolesIDs

The guard function `$blacklistRolesIDs` blocks the execution of the command if the user has any of the blacklisted roles, identified by their **ID**. It is the ID variant of `$blacklistRoles`, which compares role names.

## Syntax

```
$blacklistRolesIDs[roleID1;roleID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs of blacklisted roles. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the values with the **ID** of each role of the user (each value must be a valid Discord ID, otherwise an error "Invalid Discord ID." is raised). The `@everyone` role (whose ID is the server ID) counts as a role of the user.
- The match is an **OR**: a single matching role is enough.
- If the user has at least one matching role, the script is stopped and the error message is used as output.
- If the user has none (or all values are empty), the command continues.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Muted Role

```bdfd
$blacklistRolesIDs[123456789012345678;❌ You are muted.]
$sendMessage[Processing completed.]
```

### Multi-roles

```bdfd
$blacklistRolesIDs[111111111111111111;222222222222222222;333333333333333333;❌ Access denied.]
$sendMessage[OK.]
```

### Silent stop

```bdfd
$blacklistRolesIDs[123456789012345678;]
$sendMessage[OK.]
```

## Notes

- `$blacklistRolesIDs` compares role IDs; `$blacklistRoles` compares role names.
- To whitelist roles by ID, use `$onlyForRoleIDs`.
