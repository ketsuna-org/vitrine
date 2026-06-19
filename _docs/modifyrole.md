---
layout: doc
title: $modifyRole
translation_key: docs
category: "Moderation"
function_name: modifyRole
syntax: $modifyRole[roleID;name;(color);(hoist);(mentionable)]
description: Modifies the properties of an existing role.
---

# $modifyRole

The function `$modifyRole` **modifies the properties of an existing role** (name, color, display, mentionability). The bot must have the `ManageRoles` permission.

## Syntax

```
$modifyRole[roleID;name;(color);(hoist);(mentionable)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to modify. Required. |
| `name` | The new name of the role. Required. |
| `color` | Optional. New hex color code. |
| `hoist` | Optional. `"yes"` or `"no"` to display role members separately from online members. |
| `mentionable` | Optional. `"yes"` or `"no"` to make the role mentionable. |

## Return Value

None. The properties of the role are updated.

## Examples

### Renaming a role

```bdfd
$modifyRole[$roleID[VIP];Super VIP]
$sendMessage[✅ Role renamed to "Super VIP".]
```

### Changing the color

```bdfd
$modifyRole[$roleID[Staff];Staff;#FFD700]
$sendMessage[✅ Color of the Staff role changed to gold.]
```

### Modifying all properties

```bdfd
$modifyRole[$roleID[Moderator];Moderator;#E74C3C;yes;yes]
$sendMessage[✅ Moderator role fully updated.]
```

### Modification command

```bdfd
$if[$isAdmin==true]
  $modifyRole[$roleID[$message[1]];$message[2];$message[3]]
  $sendMessage[Role modified.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- The bot must have the `ManageRoles` permission.
- The `name` parameter is required even if you are not changing the name.
- To modify only the permissions, use `$modifyRolePerms`.
- To create a new role, use `$createRole`.
- To delete a role, use `$deleteRole`.
