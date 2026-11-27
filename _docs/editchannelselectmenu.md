---
layout: doc
title: $editChannelSelectMenu[]
translation_key: docs
category: "Components & Interactions"
function_name: editChannelSelectMenu
syntax: $editChannelSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultchannels...)]
description: "Edits a channel select menu"
---
# $editChannelSelectMenu — Edits a channel select menu

## Syntax

```
$editChannelSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultchannels...)]
```

## Parameters

- **oldcustomID** *(id, required)* — The custom id of the menu to edit
- **newcustomID** *(id, required)* — The new custom id to use for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **disabled** *(boolean, optional)* — Whether to keep this menu disabled
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **defaultchannels...** *(text, optional)* — The default selected channels of the menu

## Return Value

- String.

## Usage

```
$editChannelSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultchannels...)] → result
```

## Example

```bdfd
$addChannelSelectMenu[c]$editChannelSelectMenu[c;c2;Chan;false;1;1;31]
```
