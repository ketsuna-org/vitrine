---
layout: doc
title: $getRole
translation_key: docs
category: "Entity Info"
function_name: getRole
syntax: $getRole[(userID);(index);(guildID)]
description: Returns the ID of a role of a user according to their index (position) in the member's list of roles.
---

# $getRole

The function `$getRole` returns the **ID of a role** of a user depending on their **position** in their list of roles. The index `1` corresponds to the highest role hierarchically, `2` to the second, and so on.

## Syntax

```
$getRole[(userID);(index);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The ID of the user. Defaults to the author of the command (also when empty). |
| `index` | Optional. The position of the role (1 = highest, 2 = second...). Defaults to `1`; a non-numeric value is also treated as `1`. |
| `guildID` | Optional. Accepted but ignored: roles are always read in the current server. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role at the given position, or `""` if the index is less than 1 or beyond the number of roles of the user. An error is raised if the user ID is invalid. |

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
$color[$getRoleColor[$getRole[$authorID;1]]]
```

### Role of another user

```bdfd
$sendMessage[Main role of <@$mentioned[1]>: $roleName[$getRole[$mentioned[1];1]]]
```

## Notes

- The index starts at `1` (not `0`).
- The roles are ordered by server hierarchy (not in the order stored by Discord). If the user has no roles (only @everyone), `$getRole` returns an empty string.
- To list the names of all roles of a user, use `$userRoles[userID]`.
