---
layout: doc
title: $onlyForRoleIDs
translation_key: docs
category: "Moderation"
function_name: onlyForRoleIDs
syntax: $onlyForRoleIDs[roleID1;roleID2;...;(errorMessage)]
description: A guard function that stops execution if the user does not possess any of the specified roles by ID. Alias of $onlyForRoles.
---

# $onlyForRoleIDs

The guard function `$onlyForRoleIDs` checks if the user has **at least one** of the specified roles by their ID. It is a direct alias of `$onlyForRoles`.

## Syntax

```
$onlyForRoleIDs[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | The IDs of the allowed roles. |
| `errorMessage` | String (optional) | The message sent if no matching role is found. |

## Behavior

- Checks if the user possesses at least one of the listed roles.
- This is an **OR** check: having a single matching role is sufficient.
- Exact alias of `$onlyForRoles`.

## Examples

### Staff command

```bdfd
$onlyForRoleIDs[123456789012345678;❌ Reserved for staff.]
$ban[$mentioned[1]]
```

### Multi-roles

```bdfd
$onlyForRoleIDs[111111111111111111;222222222222222222;❌ Access denied.]
$clear[100]
```

## Notes

- `$onlyForRoleIDs` and `$onlyForRoles` are interchangeable.
- To blacklist roles by ID, use `$blacklistRoleIDs`.
- To allow specific users instead of roles, use `$onlyForIDs`.
