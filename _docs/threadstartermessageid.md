---
layout: doc
title: $threadStarterMessageID[]
translation_key: docs
category: "Entity Info"
function_name: threadStarterMessageID
syntax: $threadStarterMessageID[channelID]
description: "Returns the id of the message that started this thread."
---
# $threadStarterMessageID — Returns the id of the message that started this thread.

## Syntax

```
$threadStarterMessageID[channelID]
```

## Parameters

- **channelID** *(id, required)* — The thread to get its starter message id

## Return Value

- Message.

## Usage

```
$threadStarterMessageID[channelID] → result
```

## Example

```bdfd
$sendMessage[$threadStarterMessageID[35]]
```
