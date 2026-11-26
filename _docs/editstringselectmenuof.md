---
layout: doc
title: $editStringSelectMenuOf[]
translation_key: docs
category: "Moderation"
function_name: editStringSelectMenuOf
syntax: $editStringSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues)]
description: "Edits a string select menu of a message"
---
# $editStringSelectMenuOf — Edits a string select menu of a message

## Syntax

```
$editStringSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to edit select menu for
- **oldcustomID** *(id, required)* — The custom id of the menu to edit
- **newcustomID** *(id, required)* — The new custom id to use for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **disabled** *(boolean, optional)* — Whether to keep this menu disabled
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu

## Return Value

- Boolean.

## Usage

```
$editStringSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues)] → result
```

## Example

```bdfd
$sendMessage[$editStringSelectMenuOf[30;1000;menu;menu2;Choisir;false;1;1]]
```
