---
layout: doc
title: $getStringSelectValues
translation_key: docs
category: "Components & Interactions"
function_name: getStringSelectValues
syntax: $getStringSelectValues[separator;(limit)]
description: Gets all option values selected in a multi-select string select menu.
---

# $getStringSelectValues

The function `$getStringSelectValues[]` retrieves all option values chosen by the user in a multi-select string select menu.

## Syntax

```
$getStringSelectValues[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | The separator inserted between each element. Required (it may be a single space or any text). |
| `limit` | Optional - The maximum number of elements returned (integer of 1 or more). If empty or omitted, all selected elements are returned. |

## Return Value

- **Type**: String
- The list of all selected values, separated by the delimiter.
- An empty string if no option was selected.
- An error is raised if the limit is not an integer of 1 or more, if the interaction is not a component callback, or if the callback has no string selection.

## Behavior

- Only usable in the callback of a component interaction carrying a string selection.
- Returns the values (not the labels) of the chosen options.
- Allows processing multiple choices in a single interaction.

## Examples

### Processing multiple choices

```bdfd
$var[vals;$getStringSelectValues[, ]]
$sendMessage[You selected: $var[vals]]
```

### Limit the number of values

```bdfd
$sendMessage[First two choices: $getStringSelectValues[, ;2]]
```

## Notes

- For a single selection, use `$getStringSelectValue[]`.
- The separator can be customized to make parsing easier.
- The values are defined with `$addStringSelectOption[]`.
