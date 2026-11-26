---
layout: doc
title: $addRoleSelectMenu[]
translation_key: docs
category: "Components & Interactions"
function_name: addRoleSelectMenu
syntax: $addRoleSelectMenu[customID;(placeholder);(minvalues);(maxvalues);(disabled);(required)]
description: "Creates a role select menu"
---
# $addRoleSelectMenu — Creates a role select menu

## Syntax

```
$addRoleSelectMenu[customID;(placeholder);(minvalues);(maxvalues);(disabled);(required)]
```

## Parameters

- **customID** *(id, required)* — The custom id for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **disabled** *(boolean, optional)* — Whether the menu is disabled by default
- **required** *(boolean, optional)* — Whether this menu is required inside a modal

## Return Value

- String.

## Usage

```
$addRoleSelectMenu[customID;(placeholder);(minvalues);(maxvalues);(disabled);(required)] → result
```

## Example

```bdfd
$addRoleSelectMenu[r;Pick;1;2;true]
```
