---
layout: doc
title: $getRoleSelectRoleIDs
translation_key: docs
category: "Components & Interactions"
function_name: getRoleSelectRoleIDs
syntax: $getRoleSelectRoleIDs[(separator)]
description: Gets all role IDs selected by the user via a multi-select role menu.
---

# $getRoleSelectRoleIDs

The function `$getRoleSelectRoleIDs[]` retrieves all **role IDs** selected by the user in a multi-select role menu.

## Syntax

```
$getRoleSelectRoleIDs[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - The separator between each ID. Defaults to `, ` (comma + space). |

## Return Value

- **Type**: String
- The list of all selected role IDs.
- An empty string if no role was selected.

## Behavior

- Used with a role select menu configured with `maxValues > 1`.
- Returns all IDs in a single string with the specified separator.
- Compatible with `$textSplit[]` to iterate over each role.

## Examples

### Assigning multiple roles

```bdfd
$onInteraction[role_select]
$let[roles;$getRoleSelectRoleIDs[,]]

$textSplit[$roles;,]
  $giveRole[$authorID;$splitText[$index]]
  + Role added: $roleName[$splitText[$index]]
$endTextSplit

$sendMessage[✅ All roles have been assigned!]
```

### Displaying selected roles

```bdfd
$onInteraction[role_select]
$let[list;$getRoleSelectRoleIDs[, ]]
$let[count;$length[$splitText[$list;, ]]]

$title[🎭 $count role(s) selected]
$description[
$textSplit[$list;, ]
  $index. $roleName[$splitText[$index]]
$endTextSplit
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- For a single selection, use `$getRoleSelectRoleID[]`.
- The separator can be any string of characters.
- Useful for auto-role systems with multiple selections.
