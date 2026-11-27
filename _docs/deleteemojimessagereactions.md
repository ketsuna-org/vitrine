---
layout: doc
title: $deleteEmojiMessageReactions[]
translation_key: docs
category: "Moderation"
function_name: deleteEmojiMessageReactions
syntax: $deleteEmojiMessageReactions[channelID;messageID;emojis...]
description: "Deletes all emoji reactions from a message, returns amount of reaction emojis successfully deleted"
---
# $deleteEmojiMessageReactions — Deletes all emoji reactions from a message, returns amount of reaction emojis successfully deleted

## Syntax

```
$deleteEmojiMessageReactions[channelID;messageID;emojis...]
```

## Parameters

- **channelID** *(id, required)* — The channel the message is located
- **messageID** *(id, required)* — The message to remove emoji reactions from
- **emojis...** *(text, required)* — The emojis to delete from this message

## Return Value

- Number.

## Usage

```
$deleteEmojiMessageReactions[channelID;messageID;emojis...] → result
```

## Example

```bdfd
$sendMessage[$deleteEmojiMessageReactions[30;1000;👍;<:wave:555>]]
```
