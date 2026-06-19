---
layout: doc
title: $rolePosition
translation_key: docs
category: "Entity Info"
function_name: rolePosition
syntax: $rolePosition[roleID;(guildID)]
description: Returns the hierarchical position of a role in the server's role list.
---

# $rolePosition

The function `$rolePosition` returns the **hierarchical position** of a Discord role. The higher the position, the higher the role is in the server's hierarchy.

## Syntax

```
$rolePosition[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the target server. |

## Return Value

| Type | Description |
|---|---|
| `integer` | The position of the role in the hierarchy. |

## Examples

### Display the position

```bdfd
$sendMessage[Position of the Admin role: $rolePosition[$roleID[Admin]]]
```

### Compare two roles

```bdfd
$if[$rolePosition[$roleID[Admin]]>$rolePosition[$roleID[Mod]]]
  $sendMessage[The Admin role is hierarchically superior to Mod.]
$else
  $sendMessage[Mod is superior or equal to Admin.]
$endif
```

### Check if one role can manage another

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]>$rolePosition[$roleID[Target]]]
  $sendMessage[Your role is superior.]
$else
  $sendMessage[You cannot act because your role is inferior or equal.]
$endif
```

### Get the highest role

```bdfd
$sendMessage[Highest role of the server: $roleName[$roleID[$roleNames]]]
```

## Notes

- `@everyone` always has the position `0`.
- Positions are unique: two roles cannot have the same position.
- A bot cannot modify roles that are hierarchically higher than its own.
