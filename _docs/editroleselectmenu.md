---
layout: doc
title: $editRoleSelectMenu[]
translation_key: docs
category: "Components & Interactions"
function_name: editRoleSelectMenu
syntax: $editRoleSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles...)]
description: "Edits a role select menu"
---
# $editRoleSelectMenu — Edits a role select menu

## Syntax

```
$editRoleSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles...)]
```

## Parameters

- **oldcustomID** *(id, required)* — The custom id of the menu to edit
- **newcustomID** *(id, required)* — The new custom id to use for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **disabled** *(boolean, optional)* — Whether to keep this menu disabled
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **defaultroles...** *(text, optional)* — The default selected roles of the menu

## Return Value

- String.

## Usage

```
$editRoleSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles...)] → result
```

## Example

```bdfd
$addRoleSelectMenu[r]$editRoleSelectMenu[r;r2;Role;false;1;1;70]
```
