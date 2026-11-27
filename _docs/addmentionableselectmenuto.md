---
layout: doc
title: $addMentionableSelectMenuTo[]
translation_key: docs
category: "Components & Interactions"
function_name: addMentionableSelectMenuTo
syntax: $addMentionableSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultroles/users...)]
description: "Creates a mentionable select menu on a message"
---
# $addMentionableSelectMenuTo — Creates a mentionable select menu on a message

## Syntax

```
$addMentionableSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultroles/users...)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to add row to
- **customID** *(id, required)* — The custom id for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **disabled** *(boolean, optional)* — Whether the menu is disabled by default
- **defaultroles/users...** *(text, optional)* — The default selected roles or users to use

## Return Value

- Boolean.

## Usage

```
$addMentionableSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultroles/users...)] → result
```

## Example

```bdfd
$sendMessage[$addMentionableSelectMenuTo[30;1001;m2;Who;1;1;false;user:20,role:70]]
```
