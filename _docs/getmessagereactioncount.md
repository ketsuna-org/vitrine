---
layout: doc
title: $getMessageReactionCount[]
translation_key: docs
category: "Entity Info"
function_name: getMessageReactionCount
syntax: $getMessageReactionCount[channelID;messageID;emoji;(type)]
description: "Gets the amount of users that have reacted to a specific emoji"
---
# $getMessageReactionCount — Gets the amount of users that have reacted to a specific emoji

## Syntax

```
$getMessageReactionCount[channelID;messageID;emoji;(type)]
```

## Parameters

- **channelID** *(id, required)* — The channel the message is located
- **messageID** *(id, required)* — The message to get emoji count from
- **emoji** *(text, required)* — The emoji to get its user count
- **type** *(text, optional)* — The type of the reaction to count users for

## Return Value

- Number.

## Usage

```
$getMessageReactionCount[channelID;messageID;emoji;(type)] → result
```

## Example

```bdfd
$sendMessage[$getMessageReactionCount[30;1000;👍;burst]]
```
