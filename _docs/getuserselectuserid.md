---
layout: doc
title: $getUserSelectUserID
translation_key: docs
category: "Components & Interactions"
function_name: getUserSelectUserID
syntax: $getUserSelectUserID[index]
description: Gets the ID of the user selected via a user select menu.
---

# $getUserSelectUserID

The function `$getUserSelectUserID[]` retrieves the **ID of the user** chosen via a user select menu.

## Syntax

```
$getUserSelectUserID[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | The index of the user in the selection (1 = first). Required, integer of 1 or more. |

## Return Value

- **Type**: String (Snowflake ID)
- The Discord ID of the selected user.
- An empty string if the index is beyond the number of selected users.
- An error is raised if the index is not an integer of 1 or more, if the interaction is not a component callback, or if the callback has no user selection.

## Behavior

- Only usable in the callback of a component interaction carrying a user selection (menu created via `$addUserSelect[]`).
- For multiple selections, use `$getUserSelectUserIDs[]`.

## Examples

### User verification

```bdfd
$var[userID;$getUserSelectUserID[1]]
$title[👤 User Profile]
$description[
**Name:** $userName[$var[userID]]
**ID:** $var[userID]
**Roles:** $userRoles[$var[userID]]
]
$thumbnail[$userAvatar[$var[userID]]]
$color[#5865F2]
```

### Warning via selection

```bdfd
$var[target;$getUserSelectUserID[1]]
$title[⚠️ Warning]
$description[<@$var[target]>, you have received a warning on **$serverName**.]
```

## Notes

- The index starts at 1 and is required: `$getUserSelectUserID` without brackets is refused.
- To retrieve all users from a multiple selection, use `$getUserSelectUserIDs[]`.
