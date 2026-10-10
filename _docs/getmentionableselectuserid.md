---
layout: doc
title: $getMentionableSelectUserID
translation_key: docs
category: "Components & Interactions"
function_name: getMentionableSelectUserID
syntax: $getMentionableSelectUserID[index]
description: Gets the ID of the mentionable entity (user or role) selected via a mentionable select menu.
---

# $getMentionableSelectUserID

The function `$getMentionableSelectUserID[]` allows **retrieving the ID of the mentionable entity** selected by the user via a mentionable select menu (users + roles).

## Syntax

```
$getMentionableSelectUserID[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | The index of the entity in the selection (1 = first). Required, integer of 1 or more. |

## Return Value

- **Type** : String (Snowflake ID)
- The Discord ID of the selected user or role.
- An empty string if the index is beyond the number of selected entities.
- An error is raised if the index is not an integer of 1 or more, if the interaction is not a component callback, or if the callback has no mentionable selection.

## Behavior

- Only usable in the callback of a component interaction carrying a mentionable selection (menu created with `$addMentionableSelect`).
- The mentionable menu accepts both users and roles.
- The returned ID can be a user ID or a role ID depending on what the user chose.

## Examples

### Simple retrieval

```bdfd
$var[id;$getMentionableSelectUserID[1]]
$title[Selected entity]
$description[ID: $var[id]]
```

### Check the entity type

```bdfd
$var[id;$getMentionableSelectUserID[1]]
$if[$roleExists[$var[id]]==true]
  This is a role: @&$var[id]
$else
  This is a user: <@$var[id]>
$endif
```

## Notes

- The index starts at 1 and is required: `$getMentionableSelectUserID` without brackets is refused.
- For multiple selections, use `$getMentionableSelectUserIDs[]`.
- The returned ID may correspond to a user OR a role.
