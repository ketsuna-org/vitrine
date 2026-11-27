---
layout: doc
title: $messageAttachment[]
translation_key: docs
category: "Entity Info"
function_name: messageAttachment
syntax: $messageAttachment[channelID;messageID;index]
description: "Retrieves an attachment from this message"
---
# $messageAttachment — Retrieves an attachment from this message

## Syntax

```
$messageAttachment[channelID;messageID;index]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its attachments
- **index** *(number, required)* — The index of the attachment

## Return Value

- URL.

## Usage

```
$messageAttachment[channelID;messageID;index] → result
```

## Example

```bdfd
$sendMessage[$messageAttachment[30;1000;1]]
```
