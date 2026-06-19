---
layout: doc
title: $getUserSelectUserID
translation_key: docs
category: "Entity Info"
function_name: getUserSelectUserID
syntax: $getUserSelectUserID[(index)]
description: Gets the ID of the user selected via a user select menu.
---

# $getUserSelectUserID

The function `$getUserSelectUserID[]` retrieves the **ID of the user** chosen via a user select menu.

## Syntax

```
$getUserSelectUserID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - The index of the user in the selection (1 = first). Defaults to 1. |

## Return Value

- **Type**: String (Snowflake ID)
- The Discord ID of the selected user.
- An empty string if no user was selected.

## Behavior

- Used in interactions with a user select menu created via `$addUserSelectMenu[]`.
- The selected user can be any member of the server.
- For multiple selections, use `$getUserSelectUserIDs[]`.

## Examples

### User verification

```bdfd
$nominalTrigger
$addUserSelectMenu[user_select;1;Select a user]
$sendMessage[Choose a user to check:]

$onInteraction[user_select]
$let[userID;$getUserSelectUserID]
$title[👤 User Profile]
$description[
**Name:** $userName[$userID]
**ID:** $userID
**Joined on:** $memberJoinDate[$userID]
**Roles:** $userRoles[$userID]
]
$thumbnail[$userAvatar[$userID]]
$color[#5865F2]
$sendMessage[]
```

### Warning via selection

```bdfd
$onInteraction[user_select]
$let[target;$getUserSelectUserID]
$sendDM[$target;⚠️ You have received a warning on **$serverName**.]
$title[✅ Warning Sent]
$description[A DM was sent to **$userName[$target]**.]
$sendMessage[]
```

## Notes

- The index starts at 1.
- To retrieve all users from a multiple selection, use `$getUserSelectUserIDs[]`.
- The user must be a member of the server to be selectable.
