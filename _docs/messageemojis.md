---
layout: doc
title: $messageEmojis[]
translation_key: docs
category: "Entity Info"
function_name: messageEmojis
syntax: $messageEmojis[channelID;messageID;(separator);(returnids)]
description: "Retrieves all emojis of this message"
---
# $messageEmojis — Retrieves all emojis of this message

## Syntax

```
$messageEmojis[channelID;messageID;(separator);(returnids)]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its emojis
- **separator** *(text, optional)* — The separator to use for every emoji
- **returnids** *(boolean, optional)* — Whether to return the emoji ids, excludes unicode emojis

## Return Value

- Emoji[].

## Usage

```
$messageEmojis[channelID;messageID;(separator);(returnids)] → result
```

## Example

```bdfd
$sendMessage[$messageEmojis[30;1000;,;true]]
```
