---
layout: doc
title: $editUserSelectMenuOf[]
translation_key: docs
category: "Moderation"
function_name: editUserSelectMenuOf
syntax: $editUserSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultusers...)]
description: "Edits a user select menu of a message, returns bool"
---
# $editUserSelectMenuOf — Edits a user select menu of a message, returns bool

## Syntax

```
$editUserSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultusers...)]
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
- **defaultusers...** *(text, optional)* — The default selected users of the menu

## Return Value

- Boolean.

## Usage

```
$editUserSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultusers...)] → result
```

## Example

```bdfd
$sendMessage[$editUserSelectMenuOf[30;1000;umenu;menu3;Qui ?;false;1;2;20]]
```
