---
layout: doc
title: $addChannelSelectMenuTo[]
translation_key: docs
category: "Components & Interactions"
function_name: addChannelSelectMenuTo
syntax: $addChannelSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultchannels...)]
description: "Creates a channel select menu on a message"
---
# $addChannelSelectMenuTo — Creates a channel select menu on a message

## Syntax

```
$addChannelSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultchannels...)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to add select menu to
- **customID** *(id, required)* — The custom id for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **disabled** *(boolean, optional)* — Whether the menu is disabled by default
- **defaultchannels...** *(text, optional)* — The default selected channels to use

## Return Value

- Boolean.

## Usage

```
$addChannelSelectMenuTo[channelID;messageID;customID;(placeholder);(minvalues);(maxvalues);(disabled);(defaultchannels...)] → result
```

## Example

```bdfd
$sendMessage[$addChannelSelectMenuTo[30;1001;c;;;;;31]]
```
