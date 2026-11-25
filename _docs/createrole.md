---
layout: doc
title: $createRole
translation_key: docs
category: "Moderation"
function_name: createRole
syntax: $createRole[name;color;(hoist);(mentionable);(reason);(returnID);(icon)]
description: Creates a new role on the Discord server.
---

# $createRole

The `$createRole` function **creates a new role** on the Discord server. It returns the ID of the role only when `returnID` is `yes`. The bot must have the `ManageRoles` permission.

## Syntax

```
$createRole[name;color;(hoist);(mentionable);(reason);(returnID);(icon)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name of the role to create (1 to 100 characters, not all blank; otherwise the error `Invalid role name` is raised). Required. |
| `color` | Required. Hex color (e.g., `"#FF0000"`, `"#3498DB"`; a value without `#` is read as hex only if it contains a letter a-f, otherwise as a decimal number) or decimal number between 0 and 16777215. An empty or invalid color raises the error `Invalid role color.` |
| `hoist` | Optional. `"yes"` to display separately in the member list, `"no"` otherwise. Default `"no"` (an empty value also means `"no"`). Any other value raises `Role flags must be yes or no.` |
| `mentionable` | Optional. `"yes"` to make the role mentionable, `"no"` otherwise. Default `"no"`. Same rules as `hoist`. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |
| `returnID` | Optional. `yes`/`true`/`y` returns the ID of the created role; `no`/`false`/`n` or empty (default) returns nothing. Any other value raises `returnID must be yes or no.` |
| `icon` | Optional. The icon of the role: an image URL (`http://` or `https://`, PNG, JPEG, GIF or WebP, up to 8 MiB downloaded; Discord limits role icons to 256 KB) or a Unicode emoji (`🔥`). Empty, absent or `!remove`: no icon. Anything else raises `A role icon must be an image URL or a Unicode emoji.` Role icons need a server with at least boost level 2: otherwise the function fails with `Role icons need a server with boost level 2 (ROLE_ICONS)` **before** creating the role. |

## Return value

- **Type**: String
- By default an empty string. With `returnID` set to `yes`, the ID of the created role.

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

### Creation with an icon

```bdfd
$createRole[Staff;#E74C3C;yes;no;;yes;https://example.com/staff.png]
```

The icon is the last argument, after `returnID`: skip the arguments in between with empty semicolons.

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
- The ID is returned only with `returnID` set to `yes` (for example `$giveRole[$authorID;$createRole[VIP;#fff;;;;yes]]`); otherwise look it up afterwards with `$roleID[name]`.

## Audit log reason

The optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
