---
layout: doc
title: $messageExists[]
translation_key: docs
category: "Entity Info"
function_name: messageExists
syntax: $messageExists[channelID;messageID]
description: "Returns whether given message id exists"
---
# $messageExists — Returns whether given message id exists

## Syntax

```
$messageExists[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get the message from
- **messageID** *(id, required)* — The message to check for

## Return Value

- Boolean.

## Usage

```
$messageExists[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$messageExists[30;1000]]
```
