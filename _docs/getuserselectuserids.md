---
layout: doc
title: $getUserSelectUserIDs
translation_key: docs
category: "Entity Info"
function_name: getUserSelectUserIDs
syntax: $getUserSelectUserIDs[(separator)]
description: Gets all user IDs selected via a multi-select user select menu.
---

# $getUserSelectUserIDs

The function `$getUserSelectUserIDs[]` retrieves all **user IDs** selected in a multi-select user select menu.

## Syntax

```
$getUserSelectUserIDs[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - The separator between each ID. Defaults to `, ` (comma + space). |

## Return Value

- **Type**: String
- The list of all selected user IDs.
- An empty string if no user was selected.

## Behavior

- Used with a user select menu configured with `maxValues > 1`.
- Returns all IDs in a single string.
- Ideal for bulk actions (group DMs, role assignments, etc.).

## Examples

### Group DM

```bdfd
$onInteraction[user_select]
$let[users;$getUserSelectUserIDs[,]]

$textSplit[$users;,]
  $sendDM[$splitText[$index];📢 Important message from **$serverName**!]
$endTextSplit

$title[✅ Messages Sent]
$description[All selected users have received a DM.]
$color[#57F287]
$sendMessage[]
```

### Bulk Role Assignment

```bdfd
$onInteraction[user_select]
$let[users;$getUserSelectUserIDs[,]]
$let[count;$length[$splitText[$users;,]]]

$textSplit[$users;,]
  $giveRole[$splitText[$index];$roleID[Member]]
$endTextSplit

$title[🎭 Role Assigned]
$description[The role **Member** was given to **$count** user(s).]
$color[#5865F2]
$sendMessage[]
```

## Notes

- For a single selection, use `$getUserSelectUserID[]`.
- Compatible with `$textSplit[]` to iterate over each user.
- Useful for bulk moderation or administration commands.
