---
layout: doc
title: $addButtonTo[]
translation_key: docs
category: "Moderation"
function_name: addButtonTo
syntax: $addButtonTo[channelID;messageID;customID;label;style;(emoji);(disabled)]
description: "Adds a button component to the newest row in a message"
---
# $addButtonTo — Adds a button component to the newest row in a message

## Syntax

```
$addButtonTo[channelID;messageID;customID;label;style;(emoji);(disabled)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to add button to
- **customID** *(id, required)* — The custom id for this component
- **label** *(text, required)* — The button label
- **style** *(text, required)* — The style for this button
- **emoji** *(text, optional)* — The emoji for this button
- **disabled** *(boolean, optional)* — Whether to disable the button

## Return Value

- Boolean.

## Usage

```
$addButtonTo[channelID;messageID;customID;label;style;(emoji);(disabled)] → result
```

## Example

```bdfd
$sendMessage[$addButtonTo[30;1001;more;Plus;secondary]]
```
