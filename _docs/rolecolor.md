---
layout: doc
title: $roleColor
translation_key: docs
category: "Entity Info"
function_name: roleColor
syntax: $roleColor[roleID;(guildID)]
description: Returns the color of a Discord role in hexadecimal format.
---

# $roleColor

The function `$roleColor` returns the **color** of a Discord role in hexadecimal format. If the role does not have a defined color, it returns an empty string.

## Syntax

```
$roleColor[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the target server. |

## Return Value

| Type | Description |
|---|---|
| `string` | The color in hexadecimal (e.g., `#5865F2`), or `""` if there is no color. |

## Examples

### Display the color

```bdfd
$sendMessage[Color of the Admin role: $roleColor[$roleID[Admin]]]
```

### Embed colored according to the role

```bdfd
$title[Role $roleName[$getRole[$authorID;1]]]
$description[Here is your primary role.]
$color[$roleColor[$getRole[$authorID;1]]]
$sendMessage[]
```

### Check if the role has a color

```bdfd
$if[$roleColor[$roleID[Member]]!=]
  $sendMessage[Color: $roleColor[$roleID[Member]]]
$else
  $sendMessage[This role does not have a color.]
$endif
```

### Color of the role of a user

```bdfd
$sendMessage[Your role color: $colorRole[$authorID]]
```

## Notes

- The color is returned with the `#` prefix.
- If the role does not have a color, the value is an empty string (`""`).
- To get the color of the highest role of a user, use `$colorRole`.
