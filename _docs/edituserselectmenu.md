---
layout: doc
title: $editUserSelectMenu[]
translation_key: docs
category: "Components & Interactions"
function_name: editUserSelectMenu
syntax: $editUserSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultusers...)]
description: "Edits a user select menu"
---
# $editUserSelectMenu — Edits a user select menu

## Syntax

```
$editUserSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultusers...)]
```

## Parameters

- **oldcustomID** *(id, required)* — The custom id of the menu to edit
- **newcustomID** *(id, required)* — The new custom id to use for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **disabled** *(boolean, optional)* — Whether to keep this menu disabled
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **defaultusers...** *(text, optional)* — The default selected users of the menu

## Return Value

- String.

## Usage

```
$editUserSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultusers...)] → result
```

## Example

```bdfd
$addUserSelectMenu[u]$editUserSelectMenu[u;u2;Who;false;1;2;20]
```
