---
layout: doc
title: $createRole
translation_key: docs
category: "Moderation"
function_name: createRole
syntax: $createRole[name;color;(hoist);(mentionable)]
description: Creates a new role on the Discord server.
---

# $createRole

The `$createRole` function **creates a new role** on the Discord server. It does not return the ID of the role. The bot must have the `ManageRoles` permission.

## Syntax

```
$createRole[name;color;(hoist);(mentionable)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name of the role to create (1 to 100 characters). Required. |
| `color` | Required. Hex color (e.g., `"#FF0000"`, `"#3498DB"`) or decimal number between 0 and 16777215. An empty or invalid color raises the error `Invalid role color.` |
| `hoist` | Optional. `"yes"` to display separately in the member list, `"no"` otherwise. Default `"no"` (an empty value also means `"no"`). Any other value raises `Role flags must be yes or no.` |
| `mentionable` | Optional. `"yes"` to make the role mentionable, `"no"` otherwise. Default `"no"`. Same rules as `hoist`. |

## Return value

- **Type**: String
- An empty string. The function does not return the ID of the created role.

## Examples

### Simple creation

```bdfd
$createRole[Member VIP;#3498DB]
$sendMessage[✅ Role "Member VIP" created!]
```

### Creation with all options

```bdfd
$createRole[Staff;#E74C3C;yes;yes]
$sendMessage[Staff role created!]
```

### Creation with conditions

```bdfd
$if[$isAdmin[$authorID]==true]
  $createRole[$message[1];$message[2];no;no]
  $sendMessage[Role created.]
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
- The name and the color are required; `hoist` and `mentionable` are optional.
- The color is usually given in the hexadecimal format `#RRGGBB`.
- `hoist`: displays the members of the role in a separate section of the member list.
- `mentionable`: allows mentioning the role with `@role`.
- The ID of the new role is not returned: look it up afterwards (for example with `$roleID[name]`) to assign it with `$giveRole`.
