---
layout: doc
title: $highestRole
translation_key: docs
category: "Entity Info"
function_name: highestRole
syntax: $highestRole
description: Returns the ID of the user's highest role (hierarchically) on the server.
---

# $highestRole

The `$highestRole` function returns the **ID of the highest role** in the server's role hierarchy for the current user.

## Syntax

```
$highestRole
```

## Return Value

- **Type**: Snowflake (numeric string)
- The ID of the user's highest role.
- Includes `@everyone` if the user has no other roles.

## Behavior

- `$highestRole` takes **no arguments**.
- The hierarchy is determined by the role positions in the Discord server settings.
- If the user has multiple roles, it returns the one that is highest in the list.

## Examples

### Display the highest role

```bdfd
$title[Profile of $userName]
$author[$userName;$userAvatar]
$description[
**Highest Role:** <@&$highestRole>
**Role Name:** $roleName[$highestRole]
]
$color[$roleColor[$highestRole]]
$sendMessage[]
```

### Check hierarchy

```bdfd
$if[$highestRole==123456789012345678]
  $sendMessage[You are a staff member!]
$else
  $sendMessage[Highest role: $roleName[$highestRole]]
$endif
```

### Comparison of roles

```bdfd
$let[modRole;123456789012345678]
$if[$rolePosition[$highestRole]>=$rolePosition[$modRole]]
  $sendMessage[You have a role greater than or equal to Moderator.]
$endif
```

## Notes

- The role order is defined in the server settings (Drag & Drop in the Discord interface).
- The `@everyone` role is always the lowest, unless other roles are placed below it (manual reordering).
- For the lowest role, use `$lowestRole`.
- Use `$roleName[$highestRole]` to get the name of the role.
