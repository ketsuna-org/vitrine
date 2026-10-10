---
layout: doc
title: $getRoleSelectRoleIDs
translation_key: docs
category: "Components & Interactions"
function_name: getRoleSelectRoleIDs
syntax: $getRoleSelectRoleIDs[separator;(limit)]
description: Gets all role IDs selected by the user via a multi-select role menu.
---

# $getRoleSelectRoleIDs

The function `$getRoleSelectRoleIDs[]` retrieves all **role IDs** selected by the user in a multi-select role menu.

## Syntax

```
$getRoleSelectRoleIDs[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | The separator inserted between each element. Required (it may be a single space or any text). |
| `limit` | Optional - The maximum number of elements returned (integer of 1 or more). If empty or omitted, all selected elements are returned. |

## Return Value

- **Type**: String
- The list of all selected role IDs.
- An empty string if no role was selected.
- An error is raised if the limit is not an integer of 1 or more, if the interaction is not a component callback, or if the callback has no role selection.

## Behavior

- Only usable in the callback of a component interaction carrying a role selection.
- Returns all IDs in a single string with the specified separator.
- Compatible with `$textSplit[]` to iterate over each role.

## Examples

### Listing the selected roles

```bdfd
$sendMessage[Roles selected: $getRoleSelectRoleIDs[, ]]
```

### Limiting the number of roles

```bdfd
$title[🎭 Selected roles]
$description[First two: $getRoleSelectRoleIDs[, ;2]]
$color[#5865F2]
```

## Notes

- For a single selection, use `$getRoleSelectRoleID[]`.
- The separator can be any string of characters; it is required.
- Useful for auto-role systems with multiple selections.
