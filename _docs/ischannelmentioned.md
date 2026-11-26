---
layout: doc
title: $isChannelMentioned[]
translation_key: docs
category: "Entity Info"
function_name: isChannelMentioned
syntax: $isChannelMentioned[channelID;messageID;channelID]
description: "Returns whether a channel was mentioned in this message"
---
# $isChannelMentioned — Returns whether a channel was mentioned in this message

## Syntax

```
$isChannelMentioned[channelID;messageID;channelID]
```

## Parameters

- **channelID** *(id, required)* — Channel to pull the message from
- **messageID** *(id, required)* — The message to get mentions from
- **channelID** *(id, required)* — The entity to check for mentions

## Return Value

- Boolean.

## Usage

```
$isChannelMentioned[channelID;messageID;channelID] → result
```

## Example

```bdfd
$sendMessage[$isChannelMentioned[30;1000;31]]
```
