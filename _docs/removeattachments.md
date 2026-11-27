---
layout: doc
title: $removeAttachments[]
translation_key: docs
category: "Moderation"
function_name: removeAttachments
syntax: $removeAttachments[channelID;messageID]
description: "Removes all attachments from a message, returns bool"
---
# $removeAttachments — Removes all attachments from a message, returns bool

## Syntax

```
$removeAttachments[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to remove attachments from

## Return Value

- Boolean.

## Usage

```
$removeAttachments[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$removeAttachments[30;1000]]
```
