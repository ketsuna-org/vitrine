---
layout: doc
title: $editChannelSelectMenuOf[]
translation_key: docs
category: "Moderation"
function_name: editChannelSelectMenuOf
syntax: $editChannelSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultchannels...)]
description: "Edits a channel select menu of a message, returns bool"
---
# $editChannelSelectMenuOf — Edits a channel select menu of a message, returns bool

## Syntax

```
$editChannelSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultchannels...)]
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
- **defaultchannels...** *(text, optional)* — The default selected channels of the menu

## Return Value

- Boolean.

## Usage

```
$editChannelSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultchannels...)] → result
```

## Example

```bdfd
$sendMessage[$editChannelSelectMenuOf[30;1000;cmenu;menu3;Salon;false;1;1;31]]
```
