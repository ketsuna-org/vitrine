---
layout: doc
title: $getRole
translation_key: docs
category: "Entity Info"
function_name: getRole
syntax: $getRole[userID;index;(guildID)]
description: Returns the ID of a role of a user according to their index (position) in the member's list of roles.
---

# $getRole

The function `$getRole` returns the **ID of a role** of a user depending on their **position** in their list of roles. The index `1` corresponds to the highest role hierarchically, `2` to the second, and so on.

## Syntax

```
$getRole[userID;index;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user. Required. |
| `index` | The position of the role (1 = highest, 2 = second...). Required. |
| `guildID` | Optional. The ID of the target server. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role at the given position, or `""` if the index is invalid. |

## Examples

### Highest role

```bdfd
$sendMessage[Your highest role: $roleName[$getRole[$authorID;1]]]
```

### Check if admin

```bdfd
$if[$getRole[$authorID;1]==$roleID[Admin]]
  $sendMessage[You are an administrator!]
$else
  $sendMessage[You are not an administrator.]
$endif
```

### Secondary role

```bdfd
$sendMessage[Your second role: $roleName[$getRole[$authorID;2]]]
```

### Color of the main role

```bdfd
$title[Profile]
$description[Color of your main role]
$color[$roleColor[$getRole[$authorID;1]]]
$sendMessage[]
```

### Role of another user

```bdfd
$sendMessage[Main role of <@$mentioned[1]>: $roleName[$getRole[$mentioned[1];1]]]
```

## Notes

- The index starts at `1` (not `0`).
- If the user has no roles (only @everyone), `$getRole` may return an empty string.
- To get the color of the highest role, use `$colorRole[$userID]` directly.
- To list all roles of a user, iterate with a loop.
