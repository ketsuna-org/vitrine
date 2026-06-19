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
| `roleID` | The ID of the role to delete. Required. |

## Return value

None. The role is deleted from the server.

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
$if[$isAdmin==true]
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
- The bot cannot delete a role higher than its own.
- Use `$roleExists` to check the existence before deletion.
- To modify a role without deleting it, use `$modifyRole`.
