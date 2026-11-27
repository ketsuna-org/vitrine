---
layout: doc
title: $messageAttachmentFlags[]
translation_key: docs
category: "Entity Info"
function_name: messageAttachmentFlags
syntax: $messageAttachmentFlags[channelID;messageID;index;(separator)]
description: "Returns the flags of an attachment from this message"
---
# $messageAttachmentFlags — Returns the flags of an attachment from this message

## Syntax

```
$messageAttachmentFlags[channelID;messageID;index;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its attachment flags
- **index** *(number, required)* — The index of the attachment
- **separator** *(text, optional)* — The separator to use for every flag

## Return Value

- AttachmentFlags[].

## Usage

```
$messageAttachmentFlags[channelID;messageID;index;(separator)] → result
```

## Example

```bdfd
$sendMessage[$messageAttachmentFlags[30;1000;0]]
```
