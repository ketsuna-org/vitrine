---
layout: doc
title: $getStringSelectValue
translation_key: docs
category: "Components & Interactions"
function_name: getStringSelectValue
syntax: $getStringSelectValue[(index)]
description: Gets the value of the option selected by the user in a string select menu.
---

# $getStringSelectValue

`$getStringSelectValue[]` returns one selected value of the string select menu that triggered the current interaction.

## Syntax

```text
$getStringSelectValue[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Position of the selected value, starting at 1. Required: a positive integer, otherwise `Selection index must be a positive integer.` |

## Return Value

- **Type**: String
- The selected value at that position.
- An empty string when `index` is greater than the number of selected items.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no stringSelect selection.` when the interaction that triggered the script is not a string select menu.
- Select values are the `value` of the options (`$addStringSelectOption`), not their labels.
- The number of selected items is returned by `$getStringSelectCount`.
- Without brackets (`$getStringSelectValue`) the engine refuses the call (`Invalid argument count`).

## Examples

### First selection

```bdfd
You chose: $getStringSelectValue[1]
```

### Second selection (empty if there is only one)

```bdfd
First: $getStringSelectValue[1]\nSecond: $getStringSelectValue[2]
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  You chose: $getStringSelectValue[1]
$endif
```

## Notes

- The index starts at 1 (0 is an error).
- For all the selections at once, use `$getStringSelectValues[separator;(limit)]`.
- The menu is created with `$addStringSelect`.
