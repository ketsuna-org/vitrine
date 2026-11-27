---
layout: doc
title: $deleteUserMessageReaction[]
translation_key: docs
category: "Moderation"
function_name: deleteUserMessageReaction
syntax: $deleteUserMessageReaction[channelID;messageID;emoji;userID]
description: "Deletes user emoji reaction from a message, returns bool"
---
# $deleteUserMessageReaction — Deletes user emoji reaction from a message, returns bool

## Syntax

```
$deleteUserMessageReaction[channelID;messageID;emoji;userID]
```

## Parameters

- **channelID** *(id, required)* — The channel the message is located
- **messageID** *(id, required)* — The message to remove user emoji reaction
- **emoji** *(text, required)* — The message reaction to remove user from
- **userID** *(id, required)* — The user to delete its reaction

## Return Value

- Boolean.

## Usage

```
$deleteUserMessageReaction[channelID;messageID;emoji;userID] → result
```

## Example

```bdfd
$sendMessage[$deleteUserMessageReaction[30;1000;👍;20]]
```
