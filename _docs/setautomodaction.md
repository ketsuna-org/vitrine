---
layout: doc
title: $setAutomodAction[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodAction
syntax: $setAutomodAction[type;(channelID);(duration);(message)]
description: "Stages an action (BlockMessage, SendAlertMessage, Timeout, BlockMemberInteraction; 5 at most) for the next $editAutomodRule."
---
# $setAutomodAction — Stages an action (BlockMessage, SendAlertMessage, Timeout, BlockMemberInteraction; 5 at most) for the next $editAutomodRule.

## Syntax

```
$setAutomodAction[type;(channelID);(duration);(message)]
```

## Parameters

- **type** *(String, required)* — Action type
- **channelID** *(String, optional)* — Alert channel (alert action)
- **duration** *(String, optional)* — Timeout in seconds (timeout action)
- **message** *(String, optional)* — Message shown when blocked, 150 characters at most

## Return Value

- None.

## Usage

```
$setAutomodAction[type;channelID;duration;message] → result
```

## Example

```bdfd
$sendMessage[$setAutomodAction[type;channelID;duration;message]]
```
