---
layout: doc
title: $deleteRole
translation_key: docs
category: "Moderation"
function_name: deleteRole
syntax: $deleteRole[roleID]
description: Deletes a role from the Discord server.
---

# $deleteRole

The `$deleteRole` function **permanently deletes a role** from the Discord server. This action is irreversible. The bot must have the `ManageRoles` permission.

## Syntax

```
$deleteRole[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to delete. Required; if it is not a positive number the error `Missing or invalid role ID.` is raised. |

## Return value

None (empty string). The role is deleted from the server.

## Behavior

- The bot must have `Manage Roles` and the role must be below the bot's highest role. `@everyone` and managed roles (bot, integration, booster) cannot be deleted. If the role is not found on the server (`Role not found`) or a rule is not met, an error is raised.
- A role name is not accepted: pass an ID (for example `$roleID[name]`).

## Examples

### Simple deletion

```bdfd
$deleteRole[$roleID[Old Staff]]
$sendMessage[🗑️ Role "Old Staff" deleted.]
```

### Deletion with existence check

```bdfd
$if[$roleExists[$roleID[VIP]]==true]
  $deleteRole[$roleID[VIP]]
  $sendMessage[Role VIP deleted.]
$else
  $sendMessage[The role VIP does not exist.]
$endif
```

### Secure deletion command

```bdfd
$if[$isAdmin[$authorID]==true]
  $if[$roleExists[$roleID[$message[1]]]==true]
    $deleteRole[$roleID[$message[1]]]
    $sendMessage[✅ Role deleted successfully.]
  $else
    $sendMessage[Role not found.]
  $endif
$else
  $sendMessage[Permission denied. Admin required.]
$endif
```

## Notes

- The bot must have the `ManageRoles` permission.
- **Irreversible action**: the role is permanently deleted.
- The bot cannot delete a role equal to or higher than its own highest role.
- Use `$roleExists` to check the existence before deletion.
- To modify a role without deleting it, use `$modifyRole`.
