---
layout: doc
title: $editSelectMenu
translation_key: docs
category: "Components & Interactions"
function_name: editSelectMenu
syntax: $editSelectMenu[customId;placeholder;minValues;maxValues]
description: "Modifies the properties of an existing select menu: placeholder text, minimum and maximum number of selectable values."
---

# $editSelectMenu

The `$editSelectMenu[]` function **modifies an existing select menu**.

## Syntax

```
$editSelectMenu[customId;placeholder;minValues;maxValues]
```

## Parameters

| Parameter | Description |
|---|---|
| `customId` | The custom ID of the select menu to modify. |
| `placeholder` | Placeholder text displayed before selection. |
| `minValues` | Minimum number of required selections. |
| `maxValues` | Maximum number of allowed selections. |

## Return value

None. The select menu is modified.

## Behavior

- The targeted select menu must exist in the message.
- `minValues` must be ≤ `maxValues`.
- `maxValues` cannot exceed 25 (Discord limit).

## Examples

### Update after selection

```bdfd
$editSelectMenu[langMenu;Language chosen!;0;1]
```

### Lock a select menu

```bdfd
$editSelectMenu[closedMenu;Closed;0;0]
```

### Reset a dynamic select menu

```bdfd
$editSelectMenu[categoryMenu;Select a category;1;3]
```

## Notes

- Use with `$editMessage` to apply the modifications.
- To modify the menu options, use `$editSelectMenuOption[]`.
- `maxValues=1` creates a single-choice menu, `>1` a multi-choice menu.
