---
layout: doc
title: $getRoleSelectRoleID
translation_key: docs
category: "Entity Info"
function_name: getRoleSelectRoleID
syntax: $getRoleSelectRoleID[(index)]
description: Gets the ID of the role selected by the user via a role select menu.
---

# $getRoleSelectRoleID

The function `$getRoleSelectRoleID[]` retrieves the **ID of the role** chosen by the user in a role select menu.

## Syntax

```
$getRoleSelectRoleID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - The index of the selected role (1 = first). Defaults to 1. |

## Return Value

- **Type**: String (Snowflake ID)
- The Discord ID of the selected role.
- An empty string if no role was selected.

## Behavior

- Used in interactions of type `$onInteraction[]` with a role select menu.
- The role menu is created using `$addRoleSelectMenu[]`.
- Works with both single and multiple selections (for multiple, use `$getRoleSelectRoleIDs[]`).

## Examples

### Assigning a role via selection

```bdfd
$nominalTrigger
$addRoleSelectMenu[role_select;1;Choose your role]
$sendMessage[Select a role:]

$onInteraction[role_select]
$let[roleID;$getRoleSelectRoleID]
$giveRole[$authorID;$roleID]
$title[Role Assigned]
$description[You have received the role **$roleName[$roleID]**!]
$color[#57F287]
$sendMessage[]
```

### Retrieval with index

```bdfd
$onInteraction[role_select]
$let[first;$getRoleSelectRoleID[1]]
$let[second;$getRoleSelectRoleID[2]]
$title[Selected Roles]
$description[
**Role 1:** $roleName[$first]
**Role 2:** $roleName[$second]
]
$sendMessage[]
```

## Notes

- The index starts at 1.
- To retrieve all roles from a multiple selection, use `$getRoleSelectRoleIDs[]`.
- The returned ID is compatible with all functions that manipulate roles.
