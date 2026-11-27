---
layout: doc
title: $addRoleSelectMenuTo[]
translation_key: docs
category: "Components & Interactions"
function_name: addRoleSelectMenuTo
syntax: $addRoleSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultroles...)]
description: "Creates a role select menu on a message"
---
# $addRoleSelectMenuTo — Creates a role select menu on a message

## Syntax

```
$addRoleSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultroles...)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to add select menu to
- **customID** *(id, required)* — The custom id for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **disabled** *(boolean, optional)* — Whether the menu is disabled by default
- **defaultroles...** *(text, optional)* — The default selected roles to use

## Return Value

- Boolean.

## Usage

```
$addRoleSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultroles...)] → result
```

## Example

```bdfd
$sendMessage[$addRoleSelectMenuTo[30;1001;r;Role;1;1;false;70]]
```
