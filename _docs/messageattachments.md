---
layout: doc
title: $messageAttachments[]
translation_key: docs
category: "Entity Info"
function_name: messageAttachments
syntax: $messageAttachments[channelID;messageID;(separator)]
description: "Retrieves all attachments of this message"
---
# $messageAttachments — Retrieves all attachments of this message

## Syntax

```
$messageAttachments[channelID;messageID;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its attachments
- **separator** *(text, optional)* — The separator to use for every attachment

## Return Value

- Attachment[].

## Usage

```
$messageAttachments[channelID;messageID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$messageAttachments[30;1000;,]]
```
