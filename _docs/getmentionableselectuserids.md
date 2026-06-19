---
layout: doc
title: $getMentionableSelectUserIDs
translation_key: docs
category: "Entity Info"
function_name: getMentionableSelectUserIDs
syntax: $getMentionableSelectUserIDs[(separator)]
description: Gets all mentionable entity IDs (users and roles) selected via a multi-select mentionable menu.
---

# $getMentionableSelectUserIDs

The function `$getMentionableSelectUserIDs[]` retrieves all **mentionable entity IDs** (users and roles) selected by the user in a multi-select mentionable menu.

## Syntax

```
$getMentionableSelectUserIDs[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - The separator between each ID. Defaults to `, ` (comma + space). |

## Return Value

- **Type**: String
- The complete list of selected IDs.
- An empty string if no entity was selected.

## Behavior

- Returns both user and role IDs.
- Compatible with `$textSplit[]` for individual processing.
- The menu must allow multiple selections (`maxValues > 1`).

## Examples

### List chosen entities

```bdfd
$onInteraction[mention_select]
$let[list;$getMentionableSelectUserIDs[, ]]
$title[📋 Selected Entities]
$description[$list]
$sendMessage[]
```

### Processing loop

```bdfd
$onInteraction[mention_select]
$let[list;$getMentionableSelectUserIDs[,]]
$textSplit[$list;,]
  $if[$hasRole[$splitText[$index];$guildID]==true]
    Role: $roleName[$splitText[$index]]
  $else
    User: $userName[$splitText[$index]]
  $endif
$endTextSplit
```

## Notes

- For a single selection, use `$getMentionableSelectUserID[]`.
- IDs can be mixed (users and roles in the same list).
- Use `$hasRole[]` to distinguish a role from a user.
