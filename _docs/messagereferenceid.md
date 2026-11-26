---
layout: doc
title: $messageReferenceID[]
translation_key: docs
category: "Entity Info"
function_name: messageReferenceID
syntax: $messageReferenceID[channelID;messageID]
description: "Returns the message id that this message replies to"
---
# $messageReferenceID — Returns the message id that this message replies to

## Syntax

```
$messageReferenceID[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get the message from
- **messageID** *(id, required)* — The message to get its reference

## Return Value

- Message.

## Usage

```
$messageReferenceID[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$messageReferenceID[30;1000]]
```
