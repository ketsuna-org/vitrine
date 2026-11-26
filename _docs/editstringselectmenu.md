---
layout: doc
title: $editStringSelectMenu[]
translation_key: docs
category: "Components & Interactions"
function_name: editStringSelectMenu
syntax: $editStringSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues)]
description: "Edits a string select menu"
---
# $editStringSelectMenu — Edits a string select menu

## Syntax

```
$editStringSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues)]
```

## Parameters

- **oldcustomID** *(id, required)* — The custom id of the menu to edit
- **newcustomID** *(id, required)* — The new custom id to use for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **disabled** *(boolean, optional)* — Whether to keep this menu disabled
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu

## Return Value

- String.

## Usage

```
$editStringSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues)] → result
```

## Example

```bdfd
$addStringSelectMenu[menu;Pick]$addOption[One;;one]$editStringSelectMenu[menu;menu2;New;true;1;1]
```
