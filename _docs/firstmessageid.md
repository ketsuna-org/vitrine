---
layout: doc
title: $firstMessageID[]
translation_key: docs
category: "Entity Info"
function_name: firstMessageID
syntax: $firstMessageID[channelID]
description: "Returns the first message sent in a channel."
---
# $firstMessageID — Returns the first message sent in a channel.

## Syntax

```
$firstMessageID[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull first message from

## Return Value

- Message.

## Usage

```
$firstMessageID[channelID] → result
```

## Example

```bdfd
$sendMessage[$firstMessageID]
```
