---
layout: doc
title: $editSelectMenu
translation_key: docs
category: "Components & Interactions"
function_name: editSelectMenu
syntax: $editSelectMenu[customId;minValues;maxValues;(placeholder);(messageID)]
description: "Modifies the properties of an existing select menu: placeholder text, minimum and maximum number of selectable values."
---

# $editSelectMenu

The `$editSelectMenu[]` function **modifies an existing select menu**.

## Syntax

```
$editSelectMenu[customId;minValues;maxValues;(placeholder);(messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `customId` | The custom ID of the select menu to modify. |
| `minValues` | Required. Minimum number of selections (integer from 0 to 25). |
| `maxValues` | Required. Maximum number of selections (integer from 1 to 25). |
| `placeholder` | *(Optional)* Placeholder text (0 to 150 characters); empty by default. |
| `messageID` | *(Optional)* ID of an existing message to edit. If omitted or empty, the response being built is edited. |

## Return value

An empty string. The select menu is modified.

## Behavior

- The targeted string select menu must exist, otherwise the error "Component <id> not found." is raised.
- `minValues` must be ≤ `maxValues` ("Minimum cannot exceed maximum.").
- `maxValues` must be between 1 and 25.
- The placeholder is always replaced (empty if the argument is omitted).

## Examples

### Update after selection

```bdfd
$editSelectMenu[langMenu;0;1;Language chosen!]
```

### Lock a select menu

```bdfd
$editSelectMenu[closedMenu;0;1;Closed]
```

### Reset a dynamic select menu

```bdfd
$editSelectMenu[categoryMenu;1;3;Select a category]
```

## Notes

- To modify the menu options, use `$editSelectMenuOption[]`.
- `maxValues=1` creates a single-choice menu, `>1` a multi-choice menu.
