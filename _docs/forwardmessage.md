---
layout: doc
title: $forwardMessage[]
translation_key: docs
category: "Moderation"
function_name: forwardMessage
syntax: $forwardMessage[channelID;messageID;(channelID)]
description: "Forwards a message to another channel, returns bool"
---
# $forwardMessage — Forwards a message to another channel, returns bool

## Syntax

```
$forwardMessage[channelID;messageID;(channelID)]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to forward
- **channelID** *(id, optional)* — The channel to forward message to

## Return Value

- Boolean.

## Usage

```
$forwardMessage[channelID;messageID;(channelID)] → result
```

## Example

```bdfd
$sendMessage[$forwardMessage[30;1000;31]]
```
