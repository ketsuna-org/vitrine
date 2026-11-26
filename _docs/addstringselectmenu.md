---
layout: doc
title: $addStringSelectMenu[]
translation_key: docs
category: "Components & Interactions"
function_name: addStringSelectMenu
syntax: $addStringSelectMenu[customID;(placeholder);(disabled);(minvalues);(maxvalues);(required)]
description: "Creates a string select menu"
---
# $addStringSelectMenu — Creates a string select menu

## Syntax

```
$addStringSelectMenu[customID;(placeholder);(disabled);(minvalues);(maxvalues);(required)]
```

## Parameters

- **customID** *(id, required)* — The custom id to use for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **disabled** *(boolean, optional)* — Whether to keep this menu disabled
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **required** *(boolean, optional)* — Whether this menu is required inside a modal

## Return Value

- String.

## Usage

```
$addStringSelectMenu[customID;(placeholder);(disabled);(minvalues);(maxvalues);(required)] → result
```

## Example

```bdfd
$addStringSelectMenu[menu;Pick;true;1;2]$addOption[One;First;one]$addOption[Two;;two;;true]
```
