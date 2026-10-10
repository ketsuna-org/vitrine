---
layout: doc
title: $getRoleSelectRoleID
translation_key: docs
category: "Components & Interactions"
function_name: getRoleSelectRoleID
syntax: $getRoleSelectRoleID[index]
description: Gets the ID of the role selected by the user via a role select menu.
---

# $getRoleSelectRoleID

The function `$getRoleSelectRoleID[]` retrieves the **ID of the role** chosen by the user in a role select menu.

## Syntax

```
$getRoleSelectRoleID[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | The index of the selected role (1 = first). Required, integer of 1 or more. |

## Return Value

- **Type**: String (Snowflake ID)
- The Discord ID of the selected role.
- An empty string if the index is beyond the number of selected roles.
- An error is raised if the index is not an integer of 1 or more, if the interaction is not a component callback, or if the callback has no role selection.

## Behavior

- Only usable in the callback of a component interaction carrying a role selection.
- The role menu is created using `$addRoleSelect[]`.
- Works with both single and multiple selections (for multiple, use `$getRoleSelectRoleIDs[]`).

## Examples

### Assigning a role via selection

```bdfd
$var[roleID;$getRoleSelectRoleID[1]]
$giveRole[$authorID;$var[roleID]]
$title[Role Assigned]
$description[You have received the role **$roleName[$var[roleID]]**!]
$color[#57F287]
```

### Retrieval with index

```bdfd
$var[first;$getRoleSelectRoleID[1]]
$var[second;$getRoleSelectRoleID[2]]
$title[Selected Roles]
$description[
**Role 1:** $roleName[$var[first]]
**Role 2:** $roleName[$var[second]]
]
```

## Notes

- The index starts at 1 and is required: `$getRoleSelectRoleID` without brackets is refused.
- To retrieve all roles from a multiple selection, use `$getRoleSelectRoleIDs[]`.
- The returned ID is compatible with all functions that manipulate roles.
