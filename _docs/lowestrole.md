---
layout: doc
title: $lowestRole
translation_key: docs
category: "Entity Info"
function_name: lowestRole
syntax: $lowestRole
description: Returns the ID of the lowest role (hierarchically) of the user on the server (excluding @everyone).
---

# $lowestRole

The function `$lowestRole` returns the **ID of the lowest role** in the role hierarchy of the user on the server (generally excluding `@everyone`).

## Syntax

```
$lowestRole
```

## Return Value

- **Type** : Snowflake (numeric string)
- The ID of the lowest role of the user (excluding `@everyone`)

## Behavior

- `$lowestRole` takes **no arguments**.
- Returns the lowest non-`@everyone` role in the hierarchy.
- If the user has only the `@everyone` role, the behavior may vary.

## Examples

### Show the role hierarchy

```bdfd
$title[Role Hierarchy]
$description[
**User:** $userName
**Highest Role:** $roleName[$highestRole]
**Lowest Role:** $roleName[$lowestRole]
]
$color[#5865F2]
$sendMessage[]
```

### Check the lowest role

```bdfd
$sendMessage[Your lowest role is: $roleName[$lowestRole] (ID: $lowestRole)]
```

## Notes

- `$lowestRole` generally excludes the `@everyone` role.
- The role hierarchy is defined in the server's settings.
- To retrieve a role with specific permissions, use `$lowestRoleWithPerms[]`.

