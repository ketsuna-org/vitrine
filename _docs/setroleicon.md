---
layout: doc
title: $setRoleIcon
translation_key: docs
category: "Moderation"
function_name: setRoleIcon
syntax: $setRoleIcon[roleID;(icon);(reason)]
description: Sets or removes the icon of a role (servers with boost level 2). Bot Creator function, not in BDFD.
---

# $setRoleIcon

The `$setRoleIcon` function **sets the icon of a role**: an image or a Unicode emoji shown next to the role name. It does not return anything.

Role icons need a server with at least boost level 2. This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$setRoleIcon[roleID;(icon);(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | Required. The ID of the role. |
| `icon` | Optional. An image URL (`http://` or `https://`, PNG, JPEG, GIF or WebP, up to 8 MiB downloaded; Discord limits role icons to 256 KB), or a Unicode emoji (`🔥`). Empty, or absent: removes the icon. Anything else raises `A role icon must be an image URL or a Unicode emoji.` |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return value

| Type | Description |
|---|---|
| `string` | An empty string. The icon of the role is modified. |

## Behavior

- An image replaces an emoji, and an emoji replaces an image: a role has one icon.
- If the server has less than boost level 2, setting an icon fails with `Role icons need a server with boost level 2 (ROLE_ICONS)`. Removing an icon always works.
- The bot needs the Manage Roles permission and a role above the target role.

## Examples

### Image icon

```bdfd
$setRoleIcon[$roleID[VIP];https://example.com/vip.png]
$sendMessage[The VIP role has its icon.]
```

### Emoji icon

```bdfd
$setRoleIcon[$roleID[VIP];🔥]
```

### Remove the icon

```bdfd
$setRoleIcon[$roleID[VIP]]
```

## Notes

- `$colorRole` and `$setRoleColors` leave the icon unchanged. `$createRole` and `$modifyRole` take the icon as their last argument.
- `$getRoleIcon` reads the icon of a role.
- In a JavaScript bot (discord.js): `await role.setIcon('https://example.com/vip.png')` or `await role.setUnicodeEmoji('🔥')`; `role.setIcon(null)` removes it.
