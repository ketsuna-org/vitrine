---
layout: doc
title: $rolePosition
translation_key: docs
category: "Entity Info"
function_name: rolePosition
syntax: $rolePosition[roleID]
description: Returns the hierarchical position of a role in the server's role list.
---

# $rolePosition

The function `$rolePosition` returns the **hierarchical position** of a Discord role. Position `1` is the highest role of the server; the higher the number, the lower the role is in the hierarchy.

## Syntax

```
$rolePosition[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role in the current server. Required. An invalid ID raises "Invalid role ID."; an unknown role raises "Role not found.". |

## Return Value

| Type | Description |
|---|---|
| `integer` | The rank of the role in the hierarchy (1 = highest role, `@everyone` is always last). |

## Examples

### Display the position

```bdfd
$sendMessage[Position of the Admin role: $rolePosition[$roleID[Admin]]]
```

### Compare two roles

```bdfd
$if[$rolePosition[$roleID[Admin]]<$rolePosition[$roleID[Mod]]]
  $sendMessage[The Admin role is hierarchically superior to Mod.]
$else
  $sendMessage[Mod is superior or equal to Admin.]
$endif
```

### Check if one role can manage another

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]<$rolePosition[$roleID[Target]]]
  $sendMessage[Your role is superior.]
$else
  $sendMessage[You cannot act because your role is inferior or equal.]
$endif
```

### Get the highest role

```bdfd
$sendMessage[Highest role of the server: $roleName[$highestRole]]
```

## Notes

- The position is the rank in the hierarchy (a smaller number means a higher role); `@everyone` always has the largest number.
- Ranks are unique: if two roles have the same Discord position, the older role (smaller ID) ranks higher.
- A bot cannot modify roles that are hierarchically higher than its own.
