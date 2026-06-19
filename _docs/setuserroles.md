---
layout: doc
title: $setUserRoles
translation_key: docs
category: "Moderation"
function_name: setUserRoles
syntax: $setUserRoles[userID;role1;role2;...]
description: Sets the exact list of roles for a user, replacing all of their current roles.
---

# $setUserRoles

The function `$setUserRoles` **replaces all roles of a user** with a new list. Unlike `$giveRoles` which adds roles, `$setUserRoles` first removes all existing roles before assigning the specified ones. The bot must have the `Manage Roles` permission.

## Syntax

```
$setUserRoles[userID;role1;role2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the target user. Required. |
| `role1;role2;...` | List of role IDs to set, separated by `;`. |

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
$if[$isAdmin==true]
  $setUserRoles[$mentioned[1];$roleID[Moderator];$roleID[Staff]]
  $sendMessage[<@$mentioned[1]> is now a Moderator!]
$else
  $sendMessage[Permission denied.]
$endif
```

### Clearing all roles

```bdfd
$setUserRoles[$mentioned[1]]
$sendMessage[All roles of <@$mentioned[1]> have been removed.]
```

## Notes

- The bot must have the `Manage Roles` permission.
- **All existing roles are removed** before applying the new ones.
- To simply add roles, use `$giveRoles` instead.
- To remove specific roles, use `$takeRoles` instead.
- Leaving the role list empty removes all roles (except the @everyone role).
- The @everyone role cannot be removed.
