---
layout: doc
title: $lowestRole
translation_key: docs
category: "Entity Info"
function_name: lowestRole
syntax: $lowestRole[(userID)]
description: Returns the ID of the lowest role of the server, or of a given member. @everyone is the lowest role, so it is what this function returns.
---

# $lowestRole

The function `$lowestRole` returns the **ID of the lowest role** in the role hierarchy. Without argument it looks at all the roles of the server; with a user ID it looks at the roles of that member. The `@everyone` role is **not excluded**: it is always last in the ordering, so it is the role returned.

## Syntax

```
$lowestRole[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | *(Optional)* The ID of a member. A value that is not a positive integer raises `Invalid user ID.` If omitted, all roles of the server are considered. |

## Return Value

- **Type** : Snowflake (numeric string)
- The ID of the last role in the hierarchy. Because `@everyone` always sorts last and is always among the candidates, this is the ID of `@everyone` (which is the ID of the server) whenever Discord returns that role.
- An empty string if there is no candidate role.

## Behavior

- Roles are sorted by their Discord position, highest first; `@everyone` is always last. `$lowestRole` takes the last one of the sorted list.
- To exclude `@everyone` you have to compare the result with `$guildID`.

## Examples

### Show the role hierarchy

```bdfd
$title[Role Hierarchy]
$description[
**User:** $userName
**Highest Role:** $roleName[$highestRole[$authorID]]
**Lowest Role:** $roleName[$lowestRole[$authorID]]
]
$color[#5865F2]
```

### Check the lowest role

```bdfd
$sendMessage[Your lowest role is: $roleName[$lowestRole[$authorID]] (ID: $lowestRole[$authorID])]
```

## Notes

- `$lowestRole` does not exclude the `@everyone` role.
- To retrieve a role with specific permissions, use `$lowestRoleWithPerms[]`.

