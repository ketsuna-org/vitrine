---
layout: doc
title: $addChannelSelectMenu[]
translation_key: docs
category: "Components & Interactions"
function_name: addChannelSelectMenu
syntax: $addChannelSelectMenu[customID;(placeholder);(minvalues);(maxvalues);(disabled);(required)]
description: "Creates a channel select menu"
---
# $addChannelSelectMenu — Creates a channel select menu

## Syntax

```
$addChannelSelectMenu[customID;(placeholder);(minvalues);(maxvalues);(disabled);(required)]
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
$addChannelSelectMenu[customID;(placeholder);(minvalues);(maxvalues);(disabled);(required)] → result
```

## Example

```bdfd
$addChannelSelectMenu[c;Pick;1;2;true]
```
