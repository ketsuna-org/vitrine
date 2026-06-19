---
layout: doc
title: $createRole
translation_key: docs
category: "Moderation"
function_name: createRole
syntax: $createRole[name;(color);(hoist);(mentionable)]
description: Creates a new role on the Discord server.
---

# $createRole

The `$createRole` function **creates a new role** on the Discord server and returns its ID. The bot must have the `ManageRoles` permission.

## Syntax

```
$createRole[name;(color);(hoist);(mentionable)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name of the role to create. Required. |
| `color` | Optional. Hex color (e.g., `"#FF0000"`, `"#3498DB"`). |
| `hoist` | Optional. `"yes"` to display separately in the member list. Default `"no"`. |
| `mentionable` | Optional. `"yes"` to make the role mentionable. Default `"no"`. |

## Return value

- **Type**: ID of the created role
- The ID can be stored in a variable for future use.

## Examples

### Simple creation

```bdfd
$createRole[Member VIP]
$sendMessage[✅ Role "Member VIP" created!]
```

### Creation with all options

```bdfd
$var[newRole;$createRole[Staff;#E74C3C;yes;yes]]
$giveRole[$authorID;$var[newRole]]
$sendMessage[Staff role created and assigned!]
```

### Creation with conditions

```bdfd
$if[$isAdmin==true]
  $var[role;$createRole[$message[1];$message[2];no;no]]
  $sendMessage[Role created with the ID: $var[role]]
$else
  $sendMessage[Permission denied.]
$endif
```

### Create a colored role

```bdfd
$createRole[Custom Color;#9B59B6;no;no]
$sendMessage[Colored role created!]
```

## Notes

- The bot must have the `ManageRoles` permission.
- The name of the role is required; the other parameters are optional.
- The color must be in the hexadecimal format `#RRGGBB`.
- `hoist`: displays the members of the role in a separate section of the member list.
- `mentionable`: allows mentioning the role with `@role`.
- Use the returned value (ID of the role) with `$giveRole` to assign the new role immediately.
