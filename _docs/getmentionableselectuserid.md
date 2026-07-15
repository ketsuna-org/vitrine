---
layout: doc
title: $getMentionableSelectUserID
translation_key: docs
category: "Components & Interactions"
function_name: getMentionableSelectUserID
syntax: $getMentionableSelectUserID[(index)]
description: Gets the ID of the mentionable entity (user or role) selected via a mentionable select menu.
---

# $getMentionableSelectUserID

The function `$getMentionableSelectUserID[]` allows **retrieving the ID of the mentionable entity** selected by the user via a mentionable select menu (users + roles).

## Syntax

```
$getMentionableSelectUserID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - The index of the entity in the selection (1 = first). Default 1. |

## Return Value

- **Type** : String (Snowflake ID)
- The Discord ID of the selected user or role.
- Empty string if no mentionable was selected.

## Behavior

- Used in interactions with a menu of type `mentionable`.
- The mentionable menu accepts both users and roles.
- The returned ID can be a user ID or a role ID depending on what the user chose.

## Examples

### Simple retrieval

```bdfd
$nominalTrigger
$addMentionableSelectMenu[mention_select;1;Choose a user or role]
$sendMessage[Select an entity:]

$onInteraction[mention_select]
$let[id;$getMentionableSelectUserID]
$title[Selected entity]
$description[ID: $id]
$sendMessage[]
```

### Check the entity type

```bdfd
$onInteraction[mention_select]
$let[id;$getMentionableSelectUserID]
$if[$hasRole[$id;$guildID]==true]
  This is a role: @&$id
$else
  This is a user: <@$id>
$endif
```

## Notes

- The index starts at 1.
- For multiple selections, use `$getMentionableSelectUserIDs[]`.
- The returned ID may correspond to a user OR a role.
