---
layout: doc
title: $blacklistRoles
translation_key: docs
category: "Moderation"
function_name: blacklistRoles
syntax: $blacklistRoles[roleID1;roleID2;...;(errorMessage)]
description: Guard function that blacklists roles. If the user has any of the roles, the command is interrupted.
---

# $blacklistRoles

The guard function `$blacklistRoles` blocks the execution of the command if the user has **at least one** of the blacklisted roles.

## Syntax

```
$blacklistRoles[roleID1;roleID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleID1;roleID2;...` | Snowflake[] | IDs of roles to blacklist, separated by `;`. |
| `errorMessage` | String (optional) | Message sent if the user has a blacklisted role. |

## Behavior

- Checks if the user has any of the roles in the list.
- If **at least one** role matches, the command is interrupted.
- Checked using an **OR** condition (a single blacklisted role is enough to block).
- If an error message is provided, it is sent; otherwise, it remains silent.

## Examples

### Block muted users

```bdfd
$blacklistRoles[123456789012345678;❌ You are currently muted. Contact a moderator.]
$sendMessage[Your message has been processed.]
```

### Multiple blacklisted roles

```bdfd
$blacklistRoles[111111111111111111;222222222222222222;❌ Access forbidden for your role.]
$clear[10]
$sendMessage[10 messages deleted.]
```

### Silent blacklist

```bdfd
$blacklistRoles[123456789012345678]
$sendMessage[Command executed.]
```

## Notes

- `$blacklistRoles` and `$blacklistRoleIDs` are interchangeable.
- To whitelist roles, use `$onlyForRoles`.
- Very useful to prevent muted or restricted users from using commands.
- Combine it with `$blacklistUsers` for complete protection (specific roles + users).
