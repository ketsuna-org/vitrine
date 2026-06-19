---
layout: doc
title: $takeRoles
translation_key: docs
category: "Moderation"
function_name: takeRoles
syntax: $takeRoles[userID;role1;role2;...]
description: Removes several roles from a user in a single operation.
---

# $takeRoles

The `$takeRoles` function **removes multiple roles at once** from a user on the Discord server. The bot must have the `ManageRoles` permission.

## Syntax

```
$takeRoles[userID;role1;role2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the target user. Required. |
| `role1;role2;...` | The IDs of the roles to remove, separated by `;`. Required. |

## Return Value

None. All specified roles are removed.

## Examples

### Simple Multiple Removal

```bdfd
$takeRoles[$mentioned[1];$roleID[Muted];$roleID[Warned];$roleID[Monitored]]
$sendMessage[All sanctions for <@$mentioned[1]> have been lifted.]
```

### Role Cleanup

```bdfd
$if[$isAdmin==true]
  $takeRoles[$mentioned[1];$roleID[VIP];$roleID[Staff];$roleID[Mod]]
  $sendMessage[All special roles removed from <@$mentioned[1]>.]
$endif
```

### Conditional Removal

```bdfd
$takeRoles[$authorID;$roleID[Old];$roleID[Inactive]]
$giveRole[$authorID;$roleID[Active]]
$sendMessage[Roles updated!]
```

## Notes

- The bot must have the `ManageRoles` permission.
- The role IDs are separated by `;`.
- To remove a single role, `$takeRole` is simpler.
- Roles not possessed by the user are silently ignored.
- To completely redefine a user's roles, use `$setUserRoles`.
