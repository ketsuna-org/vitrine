---
layout: doc
title: $setRoleColors
translation_key: docs
category: "Moderation"
function_name: setRoleColors
syntax: $setRoleColors[roleID;color;(secondaryColor);(tertiaryColor);(reason)]
description: Sets the colors of a role, including the gradient and holographic styles of servers with 3 boosts. Bot Creator function, not in BDFD.
---

# $setRoleColors

The `$setRoleColors` function **changes the colors of a role**: a single color, a gradient (two colors) or the holographic style (three colors). It does not return anything.

Gradient and holographic roles need a server with at least 3 boosts. This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$setRoleColors[roleID;color;(secondaryColor);(tertiaryColor);(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | Required. The ID of the role. |
| `color` | Required. The primary color, as hex (`#5865F2`, or hex digits when the value contains a letter `a`-`f`) or as a decimal number between 0 and 16777215. An invalid color raises `Invalid role color.` |
| `secondaryColor` | Optional. The second color, same format. Makes the role a gradient. Empty or absent: no second color. |
| `tertiaryColor` | Optional. The third color, same format. Makes the gradient holographic; needs a `secondaryColor`. Discord only accepts its fixed holographic colors for this style (`#A9C9FF`, `#FFBBEC`, `#FFC3A0`). |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return value

| Type | Description |
|---|---|
| `string` | An empty string. The colors of the role are modified. |

## Behavior

- The colors are **replaced as a whole**: leaving out `secondaryColor` and `tertiaryColor` turns a gradient or holographic role back into a single-color role.
- The bot needs the Manage Roles permission and a role above the target role. If the server has fewer than 3 boosts, Discord refuses a second or third color and the error is reported.
- A `tertiaryColor` without a `secondaryColor` raises `A tertiary color needs a secondary color`.

## Examples

### Gradient role

```bdfd
$setRoleColors[$roleID[VIP];#FF0000;#0000FF]
$sendMessage[The role is now a red to blue gradient.]
```

### Back to a single color

```bdfd
$setRoleColors[$roleID[VIP];#5865F2]
```

### Holographic role

```bdfd
$setRoleColors[$roleID[VIP];#A9C9FF;#FFBBEC;#FFC3A0]
```

## Notes

- Read the colors of a role with `$getRoleColor`, `$getRoleSecondaryColor` and `$getRoleTertiaryColor`.
- `$modifyRole`, `$colorRole` and `$createRole` set the primary color only (a gradient role becomes single-color).
