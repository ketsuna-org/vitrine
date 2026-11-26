---
layout: doc
title: $messageFlags[]
translation_key: docs
category: "Entity Info"
function_name: messageFlags
syntax: $messageFlags[channelID;messageID;(separator)]
description: "Returns the flags of a message"
---
# $messageFlags — Returns the flags of a message

## Syntax

```
$messageFlags[channelID;messageID;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel to get the message from
- **messageID** *(id, required)* — The message to return its flags
- **separator** *(text, optional)* — The separator to use for every flag

## Return Value

- MessageFlags[].

## Usage

```
$messageFlags[channelID;messageID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$messageFlags[30;1000]]
```
