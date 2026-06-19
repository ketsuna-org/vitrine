---
layout: doc
title: $getRoleColor
translation_key: docs
category: "Moderation"
function_name: getRoleColor
syntax: $getRoleColor[roleID]
description: Gets the hexadecimal color of a Discord role. Returns the color in #RRGGBB format.
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
| `roleID` | The Discord ID of the role. |

## Return Value

- **Type**: String
- The color in hexadecimal `#RRGGBB` format.
- `#000000` (black) if the role has no defined color (default color).

## Behavior

- Extracts the color configured for the role.
- Returns `#000000` for roles without a color (default transparent).
- The color is usable directly in `$color[]` or any other context requiring a color.

## Examples

### Simple display

```bdfd
$let[roleID;$roleID[Admin]]
Color of the role **$roleName[$roleID]**: $getRoleColor[$roleID]
```

### Embed colored according to the role

```bdfd
$let[roleID;$highestRole[$authorID]]
$title[👤 Profile of $userName]
$description[
**Main role:** $roleName[$roleID]
**Color:** $getRoleColor[$roleID]
]
$color[$getRoleColor[$roleID]]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[]
```

### Role palette

```bdfd
$title[🎨 Role Colors]
$description[
$textSplit[$serverRoles[,];, ]
  $index. $roleName[$splitText[$index]] — $getRoleColor[$splitText[$index]]
$endTextSplit
]
$sendMessage[]
```

### Dynamic embed

```bdfd
$let[color;$getRoleColor[$highestRole[$authorID]]]

$if[$color==#000000]
  $let[color;#5865F2]
$endif

$title[Title]
$description[Description]
$color[$color]
$sendMessage[]
```

## Notes

- If the role has a default color (no color), `$getRoleColor` returns `#000000`.
- Tip: use `$if[$getRoleColor[$roleID]==#000000]` to detect roles without a color.
- The color is compatible with the embed `$color[]` function.
