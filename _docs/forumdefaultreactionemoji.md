---
layout: doc
title: $forumDefaultReactionEmoji[]
translation_key: docs
category: "Entity Info"
function_name: forumDefaultReactionEmoji
syntax: $forumDefaultReactionEmoji[channelID]
description: "Returns the default reaction emoji of a forum."
---
# $forumDefaultReactionEmoji — Returns the default reaction emoji of a forum.

## Syntax

```
$forumDefaultReactionEmoji[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get default reaction emoji from

## Return Value

- String.

## Usage

```
$forumDefaultReactionEmoji[channelID] → result
```

## Example

```bdfd
$sendMessage[$forumDefaultReactionEmoji[36]]
```
