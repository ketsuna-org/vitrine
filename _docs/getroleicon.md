---
layout: doc
title: $getRoleIcon
translation_key: docs
category: "Moderation"
function_name: getRoleIcon
syntax: $getRoleIcon[roleID;(size);(format)]
description: Gets the icon of a role, as an image URL or a Unicode emoji. Empty when the role has no icon. Bot Creator function, not in BDFD.
---

# $getRoleIcon

The `$getRoleIcon` function **returns the icon of a role**: the URL of its image, or the emoji when the icon is a Unicode emoji. A role without an icon returns an empty string, so the result is safe to test with `$if[$getRoleIcon[...]!=]`.

This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$getRoleIcon[roleID;(size);(format)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | Required. The ID of the role in the current server. An invalid ID raises `Invalid role ID.`; an unknown role raises `Role not found.`. |
| `size` | Optional. Image size in pixels: a power of two from 16 to 4096. Empty or absent keeps the default size. Any other value raises `Invalid image size: use a power of two from 16 to 4096.` Ignored for an emoji icon. |
| `format` | Optional. `png`, `jpg`, `jpeg` or `webp`. Empty or absent keeps the format Discord serves (WebP). Any other value raises an error. Ignored for an emoji icon. |

## Return value

| Type | Description |
|---|---|
| `string` | The icon image URL, the Unicode emoji, or an empty string when the role has no icon. |

## Examples

### Show the icon of a role

```bdfd
$if[$getRoleIcon[$roleID[VIP]]==]
  $sendMessage[The VIP role has no icon.]
$else
  $sendMessage[VIP icon: $getRoleIcon[$roleID[VIP];128;png]]
$endif
```

## Notes

- Role icons need a server with boost level 2: a server that never had them has roles without icons, so the result is empty.
- To set the icon: `$setRoleIcon`, or the last argument of `$createRole` and `$modifyRole`.
- In a JavaScript bot (discord.js): `role.iconURL()` and `role.unicodeEmoji`.
