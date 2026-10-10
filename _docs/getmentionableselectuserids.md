---
layout: doc
title: $getMentionableSelectUserIDs
translation_key: docs
category: "Components & Interactions"
function_name: getMentionableSelectUserIDs
syntax: $getMentionableSelectUserIDs[separator;(limit)]
description: Gets all mentionable entity IDs (users and roles) selected via a multi-select mentionable menu.
---

# $getMentionableSelectUserIDs

The function `$getMentionableSelectUserIDs[]` retrieves all **mentionable entity IDs** (users and roles) selected by the user in a multi-select mentionable menu.

## Syntax

```
$getMentionableSelectUserIDs[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | The separator inserted between each element. Required (it may be a single space or any text). |
| `limit` | Optional - The maximum number of elements returned (integer of 1 or more). If empty or omitted, all selected elements are returned. |

## Return Value

- **Type**: String
- The complete list of selected IDs.
- An empty string if no entity was selected.
- An error is raised if the limit is not an integer of 1 or more, if the interaction is not a component callback, or if the callback has no mentionable selection.

## Behavior

- Returns both user and role IDs.
- Compatible with `$textSplit[]` for individual processing.
- Only usable in the callback of a component interaction carrying a mentionable selection.

## Examples

### List chosen entities

```bdfd
$var[list;$getMentionableSelectUserIDs[, ]]
$title[📋 Selected Entities]
$description[$var[list]]
```

### Limit the number of entities

```bdfd
$description[First two entities: $getMentionableSelectUserIDs[, ;2]]
```

## Notes

- For a single selection, use `$getMentionableSelectUserID[]`.
- IDs can be mixed (users and roles in the same list).
- Use `$roleExists[]` to distinguish a role from a user.
