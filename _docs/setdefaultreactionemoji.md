---
layout: doc
title: $setDefaultReactionEmoji[]
translation_key: docs
category: "Moderation"
function_name: setDefaultReactionEmoji
syntax: $setDefaultReactionEmoji[channelID;(emoji);(reason)]
description: "Sets a forum's default reaction emoji for posts."
---
# $setDefaultReactionEmoji — Sets a forum's default reaction emoji for posts.

## Syntax

```
$setDefaultReactionEmoji[channelID;(emoji);(reason)]
```

## Parameters

- **channelID** *(id, required)* — The forum to modify
- **emoji** *(text, optional)* — The new default reaction emoji
- **reason** *(text, optional)* — The reason for modifying default emoji

## Return Value

- Boolean.

## Usage

```
$setDefaultReactionEmoji[channelID;(emoji);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setDefaultReactionEmoji[36;👍]]
```
