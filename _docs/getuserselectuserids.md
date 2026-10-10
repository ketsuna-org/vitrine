---
layout: doc
title: $getUserSelectUserIDs
translation_key: docs
category: "Components & Interactions"
function_name: getUserSelectUserIDs
syntax: $getUserSelectUserIDs[separator;(limit)]
description: Gets all user IDs selected via a multi-select user select menu.
---

# $getUserSelectUserIDs

The function `$getUserSelectUserIDs[]` retrieves all **user IDs** selected in a multi-select user select menu.

## Syntax

```
$getUserSelectUserIDs[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | The separator inserted between each element. Required (it may be a single space or any text). |
| `limit` | Optional - The maximum number of elements returned (integer of 1 or more). If empty or omitted, all selected elements are returned. |

## Return Value

- **Type**: String
- The list of all selected user IDs.
- An empty string if no user was selected.
- An error is raised if the limit is not an integer of 1 or more, if the interaction is not a component callback, or if the callback has no user selection.

## Behavior

- Only usable in the callback of a component interaction carrying a user selection.
- Returns all IDs in a single string.

## Examples

### Group DM

```bdfd
$var[users;$getUserSelectUserIDs[, ]]

$title[👥 Selected users]
$description[$var[users]]
$color[#57F287]
```

### Limit the number of users

```bdfd
$sendMessage[First three users: $getUserSelectUserIDs[, ;3]]
```

## Notes

- For a single selection, use `$getUserSelectUserID[]`.
- Compatible with `$textSplit[]` to iterate over each user.
