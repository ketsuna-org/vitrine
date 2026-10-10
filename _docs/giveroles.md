---
layout: doc
title: $giveRoles
translation_key: docs
category: "Moderation"
function_name: giveRoles
syntax: $giveRoles[userID;role1;role2;...]
description: Assigns several roles to a user in a single operation.
---

# $giveRoles

The function `$giveRoles` assigns multiple roles at once to a user. It is the multi-role version of `$giveRole`. The bot must have the `ManageRoles` permission.

## Syntax

```
$giveRoles[userID;role1;role2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the target user. Required (mentions are not used). |
| `role1;role2;...` | The IDs of the roles to assign, separated by `;`. Required. |

## Return Value

None. All specified roles are assigned. An error is raised if the user ID or a role ID is invalid.

## Examples

### Simple multiple assignment

```bdfd
$giveRoles[$mentioned[1];$roleID[Member];$roleID[Notifications]]
$sendMessage[<@$mentioned[1]> has received the Member and Notifications roles.]
```

### Grouped assignment with a condition

```bdfd
$if[$isAdmin[$authorID]==true]
  $giveRoles[$mentioned[1];$roleID[Modo];$roleID[Staff];$roleID[VIP]]
  $sendMessage[All staff roles assigned to <@$mentioned[1]>.]
$else
  $sendMessage[Permission denied.]
$endif
```

### Welcome command

```bdfd
$giveRoles[$authorID;$roleID[Member];$roleID[New];$roleID[Auto]]
$sendMessage[Welcome $userName! Default roles assigned.]
```

## Notes

- The bot must have the `ManageRoles` permission; each role must be below the bot's highest role, and `@everyone` and managed roles cannot be assigned.
- The roles are separated by `;` in the syntax.
- To assign a single role, `$giveRole` is simpler.
- To replace all existing roles, use `$setUserRoles`.
- The user and each role must be valid IDs; the roles are assigned one after the other, so an invalid role stops the call after the previous roles were assigned.
