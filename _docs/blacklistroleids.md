---
layout: doc
title: $blacklistRoleIDs
translation_key: docs
category: "Moderation"
function_name: blacklistRoleIDs
syntax: $blacklistRoleIDs[roleID1;roleID2;...;(errorMessage)]
description: Guard function that blacklists roles by ID. Alias of $blacklistRoles.
---

# $blacklistRoleIDs

The guard function `$blacklistRoleIDs` blocks the execution of the command if the user has any of the blacklisted roles. This is a direct alias of `$blacklistRoles`.

## Syntax

```
$blacklistRoleIDs[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs of blacklisted roles. |
| `errorMessage` | String (optional) | Message sent if the user has a blacklisted role. |

## Behavior

- Checks the user's roles.
- Checked using an **OR** condition: a single blacklisted role is enough.
- Exact alias of `$blacklistRoles`.

## Examples

### Muted Role

```bdfd
$blacklistRoleIDs[123456789012345678;❌ You are muted.]
$sendMessage[Processing completed.]
```

### Multi-roles

```bdfd
$blacklistRoleIDs[111;222;333;❌ Access denied.]
$sendMessage[OK.]
```

## Notes

- `$blacklistRoleIDs` and `$blacklistRoles` are interchangeable.
- To whitelist roles, use `$onlyForRoleIDs`.
- For large servers, store the IDs in a variable (`$getServerVar`) for easier maintenance.
