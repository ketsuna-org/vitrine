---
layout: doc
title: $addStringSelectMenuTo[]
translation_key: docs
category: "Components & Interactions"
function_name: addStringSelectMenuTo
syntax: $addStringSelectMenuTo[channelID;messageID;customID;(placeholder);(disabled);(minvalues);(maxvalues)]
description: "Creates a string select menu on a message"
---
# $addStringSelectMenuTo — Creates a string select menu on a message

## Syntax

```
$addStringSelectMenuTo[channelID;messageID;customID;(placeholder);(disabled);(minvalues);(maxvalues)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to add select menu to
- **customID** *(id, required)* — The custom id to use for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **disabled** *(boolean, optional)* — Whether to keep this menu disabled
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu

## Return Value

- Boolean.

## Usage

```
$addStringSelectMenuTo[channelID;messageID;customID;(placeholder);(disabled);(minvalues);(maxvalues)] → result
```

## Example

```bdfd
$sendMessage[$addStringSelectMenuTo[30;1001;pick;Choose;false;1;1;One=one;Two=two]]
```
