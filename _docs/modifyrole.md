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
| `name` | Optional. The new name of the role (1 to 100 characters, not all blank; otherwise `Invalid role name`). Empty or `!unchanged` keeps the current name. |
| `color` | Optional. New color, as a hex code (`#RRGGBB`) or a decimal number between 0 and 16777215. Empty or `!unchanged` keeps the current color; an invalid value raises `Invalid role color.` |
| `hoist` | Optional. `"yes"` or `"no"` to display role members separately from online members. Empty or `!unchanged` keeps the current value; any other value raises `Role flags must be yes or no.` |
| `mentionable` | Optional. `"yes"` or `"no"` to make the role mentionable. Empty or `!unchanged` keeps the current value; any other value raises an error. |
| `position` | Optional. New position of the role (integer, 0 or more, otherwise `Invalid role position.`). It must be lower than the position of the bot's highest role (`Invalid role position: must be below the bot`), and the @everyone role cannot be moved. Empty or `!unchanged` keeps the current position. |

## Return Value

None (empty string). The properties of the role are updated.

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
$if[$isAdmin[$authorID]==true]
  $modifyRole[$roleID[$message[1]];$message[2];$message[3]]
  $sendMessage[Role modified.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- The bot must have `Manage Roles` and the target role must be below the bot's highest role (managed roles cannot be modified); otherwise an error is raised. The `@everyone` role can be modified (except its position).
- Only `roleID` is required: any other parameter left empty (or set to `!unchanged`) keeps its current value.
- Use empty semicolons `;` to skip parameters (e.g. `$modifyRole[$roleID[Staff];;#FFD700]`).
- To modify only the permissions, use `$modifyRolePerms`.
- To create a new role, use `$createRole`.
- To delete a role, use `$deleteRole`.
