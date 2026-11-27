---
layout: doc
title: $deleteAllMessageReactions[]
translation_key: docs
category: "Moderation"
function_name: deleteAllMessageReactions
syntax: $deleteAllMessageReactions[channelID;messageID]
description: "Deletes all reactions from a message, returns bool"
---
# $deleteAllMessageReactions — Deletes all reactions from a message, returns bool

## Syntax

```
$deleteAllMessageReactions[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel the message is located
- **messageID** *(id, required)* — The message to remove reactions from

## Return Value

- Boolean.

## Usage

```
$deleteAllMessageReactions[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$deleteAllMessageReactions[30;1000]]
```
