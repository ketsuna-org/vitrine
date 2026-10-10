---
layout: doc
title: $modifyRole
translation_key: docs
category: "Moderation"
function_name: modifyRole
syntax: $modifyRole[roleID;(name);(color);(hoist);(mentionable);(position)]
description: Modifies the properties of an existing role.
---

# $modifyRole

The function `$modifyRole` **modifies the properties of an existing role** (name, color, display, mentionability, position).

## Syntax

```
$modifyRole[roleID;(name);(color);(hoist);(mentionable);(position)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to modify. Required (a positive integer, otherwise an error is raised). |
| `name` | Optional. The new name of the role. Empty or `!unchanged` keeps the current name. |
| `color` | Optional. New color, as a hex code (`#RRGGBB`) or a decimal number between 0 and 16777215. Empty or `!unchanged` keeps the current color; an invalid value raises an error. |
| `hoist` | Optional. `"yes"` or `"no"` to display role members separately from online members. Empty or `!unchanged` keeps the current value; any other value raises an error. |
| `mentionable` | Optional. `"yes"` or `"no"` to make the role mentionable. Empty or `!unchanged` keeps the current value; any other value raises an error. |
| `position` | Optional. New position of the role (integer, 0 or more). Empty or `!unchanged` keeps the current position. |

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

- The bot must be allowed to manage the target role; otherwise the engine returns a permission error.
- Only `roleID` is required: any other parameter left empty (or set to `!unchanged`) keeps its current value.
- Use empty semicolons `;` to skip parameters (e.g. `$modifyRole[$roleID[Staff];;#FFD700]`).
- To modify only the permissions, use `$modifyRolePerms`.
- To create a new role, use `$createRole`.
- To delete a role, use `$deleteRole`.
