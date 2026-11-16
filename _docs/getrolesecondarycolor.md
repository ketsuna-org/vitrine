---
layout: doc
title: $getRoleSecondaryColor
translation_key: docs
category: "Moderation"
function_name: getRoleSecondaryColor
syntax: $getRoleSecondaryColor[roleID]
description: Gets the secondary color of a Discord role (six uppercase hexadecimal digits), or an empty string when the role has none. Bot Creator function, not in BDFD.
---

# $getRoleSecondaryColor

The function `$getRoleSecondaryColor[]` retrieves the second color of a gradient role. Servers with at least 3 boosts can give roles several colors; `$getRoleColor` only returns the primary one.

This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$getRoleSecondaryColor[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The Discord ID of the role. A value that is not a positive number raises `Invalid role ID.`; an ID that is not a role of the server raises `Role not found.` |

## Return Value

- **Type**: String
- The secondary color as six uppercase hexadecimal digits `RRGGBB`, without a leading `#`.
- An empty string when the role has no secondary color (single-color role, or a server without the feature).

## Examples

### Show all the colors of a role

```bdfd
$var[roleID;$roleID[VIP]]
Primary: $getRoleColor[$var[roleID]]
Secondary: $getRoleSecondaryColor[$var[roleID]]
Tertiary: $getRoleTertiaryColor[$var[roleID]]
```

## Notes

- A role has a secondary color when it is a gradient or holographic role.
- Use `$setRoleColors` to change the colors of a role.
