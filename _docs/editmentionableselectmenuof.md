---
layout: doc
title: $editMentionableSelectMenuOf[]
translation_key: docs
category: "Moderation"
function_name: editMentionableSelectMenuOf
syntax: $editMentionableSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles/users...)]
description: "Edits a mentionable select menu of a message, returns bool"
---
# $editMentionableSelectMenuOf — Edits a mentionable select menu of a message, returns bool

## Syntax

```
$editMentionableSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles/users...)]
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
- **defaultroles/users...** *(text, optional)* — The default selected roles or users to use

## Return Value

- Boolean.

## Usage

```
$editMentionableSelectMenuOf[channelID;messageID;oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles/users...)] → result
```

## Example

```bdfd
$sendMessage[$editMentionableSelectMenuOf[30;1001;mmenu;menu3;Qui ?;false;1;1;user:20,role:70]]
```
