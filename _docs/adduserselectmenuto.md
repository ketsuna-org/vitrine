---
layout: doc
title: $addUserSelectMenuTo[]
translation_key: docs
category: "Components & Interactions"
function_name: addUserSelectMenuTo
syntax: $addUserSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultusers...)]
description: "Creates a user select menu on a message"
---
# $addUserSelectMenuTo — Creates a user select menu on a message

## Syntax

```
$addUserSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultusers...)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to add select menu to
- **customID** *(id, required)* — The custom id for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **disabled** *(boolean, optional)* — Whether the menu is disabled by default
- **defaultusers...** *(text, optional)* — The default selected users to use

## Return Value

- Boolean.

## Usage

```
$addUserSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultusers...)] → result
```

## Example

```bdfd
$sendMessage[$addUserSelectMenuTo[30;1001;u;Who;1;2;true;20]]
```
