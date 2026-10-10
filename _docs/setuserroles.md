---
layout: doc
title: $setUserRoles
translation_key: docs
category: "Moderation"
function_name: setUserRoles
syntax: $setUserRoles[userID;role1;(role2;...)]
description: Sets the exact list of roles for a user, replacing all of their current roles.
---

# $setUserRoles

The function `$setUserRoles` **replaces all roles of a user** with a new list. Unlike `$giveRoles` which adds roles, `$setUserRoles` first removes all existing roles before assigning the specified ones. The bot must have the `Manage Roles` permission.

## Syntax

```
$setUserRoles[userID;role1;(role2;...)]
```

At least 2 arguments are required: the user ID and one role ID.

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the target user. Required. |
| `role1` | ID of the first role to set. Required. |
| `role2;...` | Optional. Other role IDs to set, separated by `;`. Every ID must be a valid positive number, otherwise the error "Missing or invalid role ID." is raised. |

## Return Value

None. The user's roles are replaced.

## Examples

### Resetting roles

```bdfd
$setUserRoles[$mentioned[1];$roleID[Member]]
$sendMessage[<@$mentioned[1]> now only has the Member role.]
```

### Setting a specific set of roles

```bdfd
$setUserRoles[$mentioned[1];$roleID[Member];$roleID[VIP];$roleID[Active]]
$sendMessage[Roles of <@$mentioned[1]> updated.]
```

### Promoting a member

```bdfd
$setUserRoles[$mentioned[1];$roleID[Moderator];$roleID[Staff]]
$sendMessage[<@$mentioned[1]> is now a Moderator!]
```

## Notes

- The bot must have the `Manage Roles` permission.
- **All existing roles are removed** before applying the new ones.
- To simply add roles, use `$giveRoles` instead.
- To remove specific roles, use `$takeRoles` instead.
- The role list cannot be empty: `$setUserRoles[userID]` is refused (at least one role ID is required).
- The @everyone role cannot be listed (its ID is the server ID): doing so raises an error.
- Duplicate role IDs are merged. Every role that is added **or** dropped by the replacement must be manageable by the bot (below its highest role, not a managed role); otherwise nothing is changed and an error is raised. An ID that is not a role of the server raises `Role not found`.
