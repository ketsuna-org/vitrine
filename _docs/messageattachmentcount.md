---
layout: doc
title: $messageAttachmentCount[]
translation_key: docs
category: "Entity Info"
function_name: messageAttachmentCount
syntax: $messageAttachmentCount[channelID;messageID]
description: "Retrieve the amount of attachments in this message"
---
# $messageAttachmentCount — Retrieve the amount of attachments in this message

## Syntax

```
$messageAttachmentCount[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its attachment count

## Return Value

- Number.

## Usage

```
$messageAttachmentCount[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$messageAttachmentCount[30;1000]]
```
