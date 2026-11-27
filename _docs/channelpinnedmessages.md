---
layout: doc
title: $channelPinnedMessages[]
translation_key: docs
category: "Entity Info"
function_name: channelPinnedMessages
syntax: $channelPinnedMessages[channelID;(separator)]
description: "Returns the pinned messages of a channel."
---
# $channelPinnedMessages — Returns the pinned messages of a channel.

## Syntax

```
$channelPinnedMessages[channelID;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull pinned messages from
- **separator** *(text, optional)* — The separator to use for each message id

## Return Value

- Message[].

## Usage

```
$channelPinnedMessages[channelID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$channelPinnedMessages[30;,]]
```
