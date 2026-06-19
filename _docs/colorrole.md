---
layout: doc
title: $colorRole
translation_key: docs
category: "Entity Info"
function_name: colorRole
syntax: $colorRole[userID;(guildID)]
description: Returns the hex color of the highest colored role of a user.
---

# $colorRole

The `$colorRole` function returns the **hex color** of a user's highest colored role. Very useful for customizing embeds according to a user's role color.

## Syntax

```
$colorRole[userID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user. Required. |
| `guildID` | Optional. The ID of the target server. |

## Return value

| Type | Description |
|---|---|
| `string` | Hex color code (e.g., `#5865F2`), or `""` if they have no colored role. |

## Examples

### Display the color

```bdfd
$sendMessage[Your role color: $colorRole[$authorID]]
```

### Custom embed

```bdfd
$title[Profile of $username]
$description[
**Role:** $roleName[$getRole[$authorID;1]]
**Color:** $colorRole[$authorID]
]
$color[$colorRole[$authorID]]
$sendMessage[]
```

### Color of another user

```bdfd
$sendMessage[Color of <@$mentioned[1]>: $colorRole[$mentioned[1]]]
```

### Fallback if no color

```bdfd
$if[$colorRole[$authorID]!=]
  $color[$colorRole[$authorID]]
$else
  $color[#5865F2]
$endif
$title[Profile]
$description[User information]
$sendMessage[]
```

## Notes

- Returns an empty string if the user does not have a role with a color.
- The color is in the format hexadecimal with `#`.
- Perfect for use with `$color[]` in embeds.
- Unlike `$roleColor`, `$colorRole` targets a **user**, not a role.
