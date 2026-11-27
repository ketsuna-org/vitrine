---
layout: doc
title: $getMessageReactionUsers[]
translation_key: docs
category: "Entity Info"
function_name: getMessageReactionUsers
syntax: $getMessageReactionUsers[channelID;messageID;emoji;(separator)]
description: "Gets the user ids that have reacted to a specific emoji"
---
# $getMessageReactionUsers — Gets the user ids that have reacted to a specific emoji

## Syntax

```
$getMessageReactionUsers[channelID;messageID;emoji;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel the message is located
- **messageID** *(id, required)* — The message to get emoji users from
- **emoji** *(text, required)* — The emoji to get its users
- **separator** *(text, optional)* — The separator to use for every user

## Return Value

- User[].

## Usage

```
$getMessageReactionUsers[channelID;messageID;emoji;(separator)] → result
```

## Example

```bdfd
$sendMessage[$getMessageReactionUsers[30;1000;👍;,]]
```
