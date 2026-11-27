---
layout: doc
title: $clearMessages[]
translation_key: docs
category: "Moderation"
function_name: clearMessages
syntax: $clearMessages[channelID;amount;(deletePinned);(deleteBots)]
description: "Deletes recent messages of a channel (1000 at most, in batches of 100) and returns how many were removed. Pinned messages are kept unless deletePinned is yes; messages of bots are removed too."
---
# $clearMessages — Deletes recent messages of a channel (1000 at most, in batches of 100) and returns how many were removed. Pinned messages are kept unless deletePinned is yes; messages of bots are removed too.

## Syntax

```
$clearMessages[channelID;amount;(deletePinned);(deleteBots)]
```

## Parameters

- **channelID** *(String, required)* — Channel ID
- **amount** *(Number, required)* — Amount (1 to 1000)
- **deletePinned** *(Boolean, optional)* — Delete pinned messages
- **deleteBots** *(Boolean, optional)* — Ignored

## Return Value

- Number.

## Usage

```
$clearMessages[channelID;amount;deletePinned;deleteBots] → result
```

## Example

```bdfd
$sendMessage[$clearMessages[channelID;amount;deletePinned;deleteBots]]
```
