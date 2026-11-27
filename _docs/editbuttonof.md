---
layout: doc
title: $editButtonOf[]
translation_key: docs
category: "Moderation"
function_name: editButtonOf
syntax: $editButtonOf[channelID;messageID;customID;newcustomID;(label);(style);(emoji);(disabled)]
description: "Edits a button component of a message"
---
# $editButtonOf — Edits a button component of a message

## Syntax

```
$editButtonOf[channelID;messageID;customID;newcustomID;(label);(style);(emoji);(disabled)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to edit button for
- **customID** *(id, required)* — The custom id to find the component
- **newcustomID** *(id, required)* — The new custom id for this component
- **label** *(text, optional)* — The new button label
- **style** *(text, optional)* — The new style for this button
- **emoji** *(text, optional)* — The new emoji for this button
- **disabled** *(boolean, optional)* — Whether to disable the button

## Return Value

- Boolean.

## Usage

```
$editButtonOf[channelID;messageID;customID;newcustomID;(label);(style);(emoji);(disabled)] → result
```

## Example

```bdfd
$sendMessage[$editButtonOf[30;1000;yes;ok;Valider;success]]
```
