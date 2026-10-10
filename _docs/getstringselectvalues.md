---
layout: doc
title: $getStringSelectValues
translation_key: docs
category: "Components & Interactions"
function_name: getStringSelectValues
syntax: $getStringSelectValues[(separator)]
description: Gets all option values selected in a multi-select string select menu.
---

# $getStringSelectValues

`$getStringSelectValues[]` returns all the option values selected in the string select menu that triggered the current interaction, joined by a separator.

## Syntax

```text
$getStringSelectValues[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Text inserted between the items. Required, not trimmed; an empty separator concatenates the items without anything between them. |
| `limit` | Optional. Maximum number of items returned, taken from the first selected. A positive integer, otherwise `Selection limit must be a positive integer.`; empty or omitted means no limit. |

## Return Value

- **Type**: String
- The selected option values, in selection order, joined by `separator`.
- An empty string when nothing was selected.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no stringSelect selection.` when the interaction that triggered the script is not a string select menu.
- Select values are the `value` of the options (`$addStringSelectOption`), not their labels.
- The number of selected items is returned by `$getStringSelectCount`.
- Without brackets (`$getStringSelectValues`) the engine refuses the call (`Invalid argument count`).

## Examples

### All selections

```bdfd
Selected: $getStringSelectValues[, ]
```

### Limit the number of items

```bdfd
First two: $getStringSelectValues[, ;2]
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  Selected: $getStringSelectValues[, ]
$endif
```

## Notes

- For a single value, use `$getStringSelectValue[index]`.
- With a menu that allows one selection only, the list contains at most one item.
- The menu is created with `$addStringSelect`.
