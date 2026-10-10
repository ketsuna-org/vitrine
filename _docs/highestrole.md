---
layout: doc
title: $highestRole
translation_key: docs
category: "Entity Info"
function_name: highestRole
syntax: $highestRole[(userID)]
description: Returns the ID of the highest role of the server, or of the highest role of a given member.
---

# $highestRole

The `$highestRole` function returns the **ID of the highest role** in the server's role hierarchy. Without argument it looks at all the roles of the server; with a user ID it only looks at the roles of that member.

## Syntax

```
$highestRole[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | *(Optional)* The ID of a member. A value that is not a positive integer raises `Invalid user ID.` If omitted, **all roles of the server** are considered, not the roles of the command author. |

## Return Value

- **Type**: Snowflake (numeric string)
- Without argument: the ID of the highest role of the server.
- With a user ID: the ID of the highest role among the roles of that member (`@everyone` is always included in the candidates).
- An empty string if there is no candidate role.

## Behavior

- Roles are sorted by their Discord position, highest first. At equal positions the role with the smaller (older) ID comes first. `@everyone` is always last.
- To get the highest role of the author of the command, pass their ID: `$highestRole[$authorID]`.

## Examples

### Display the highest role

```bdfd
$title[Profile of $userName]
$author[$userName;$userAvatar[$authorID]]
$description[
**Highest Role:** <@&$highestRole[$authorID]>
**Role Name:** $roleName[$highestRole[$authorID]]
]
$color[#$getRoleColor[$highestRole[$authorID]]]
```

### Check hierarchy

```bdfd
$if[$highestRole[$authorID]==123456789012345678]
  $sendMessage[You are a staff member!]
$else
  $sendMessage[Highest role: $roleName[$highestRole[$authorID]]]
$endif
```

### Comparison of roles

```bdfd
$var[modRole;123456789012345678]
$if[$rolePosition[$highestRole[$authorID]]<=$rolePosition[$var[modRole]]]
  $sendMessage[You have a role greater than or equal to Moderator.]
$endif
```

## Notes

- `$rolePosition[roleID]` returns the rank in the same ordering, where `1` is the highest role: a smaller number means a higher role.
- The `@everyone` role is always last in the ordering.
- For the lowest role, use `$lowestRole`.
- Use `$roleName[roleID]` to get the name of a role.
