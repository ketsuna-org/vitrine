---
layout: doc
title: $getRoleColor
translation_key: docs
category: "Moderation"
function_name: getRoleColor
syntax: $getRoleColor[roleID]
description: Gets the hexadecimal color of a Discord role. Returns the color as six uppercase hexadecimal digits (RRGGBB, without #).
---

# $getRoleColor

The function `$getRoleColor[]` retrieves the **hexadecimal color** of a Discord role.

## Syntax

```
$getRoleColor[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The Discord ID of the role. A value that is not a positive number raises `Invalid role ID.`; an ID that is not a role of the server raises `Role not found.` |

## Return Value

- **Type**: String
- The color as six uppercase hexadecimal digits `RRGGBB`, without a leading `#` (add the `#` yourself where one is needed).
- `000000` (black) if the role has no defined color (default color).

## Behavior

- Extracts the color configured for the role.
- Returns `000000` for roles without a color (default transparent).
- Prefix the result with `#` to use it as a hex color, e.g. `$color[#$getRoleColor[roleID]]`.

## Examples

### Simple display

```bdfd
$var[roleID;$roleID[Admin]]
Color of the role **$roleName[$var[roleID]]**: $getRoleColor[$var[roleID]]
```

### Embed colored according to the role

```bdfd
$var[roleID;$highestRole[$authorID]]
$title[👤 Profile of $userName]
$description[
**Main role:** $roleName[$var[roleID]]
**Color:** $getRoleColor[$var[roleID]]
]
$color[#$getRoleColor[$var[roleID]]]
$thumbnail[$userAvatar[$authorID]]
```

### Role palette

```bdfd
$title[🎨 Role Colors]
$description[
**Admin:** $getRoleColor[$roleID[Admin]]
**Moderator:** $getRoleColor[$roleID[Moderator]]
]
```

### Dynamic embed

```bdfd
$var[color;#$getRoleColor[$highestRole[$authorID]]]

$if[$var[color]==#000000]
  $var[color;#5865F2]
$endif

$title[Title]
$description[Description]
$color[$var[color]]
```

## Notes

- If the role has a default color (no color), `$getRoleColor` returns `000000`.
- Tip: use `$if[$getRoleColor[$roleID]==000000]` to detect roles without a color.
- Once prefixed with `#`, the color can be passed to the embed `$color[]` function.
