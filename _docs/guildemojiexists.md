---
layout: doc
title: $guildEmojiExists[]
translation_key: docs
category: "Entity Info"
function_name: guildEmojiExists
syntax: $guildEmojiExists[guildID;emojiID]
description: "Returns whether an emoji id exists on a guild."
---
# $guildEmojiExists — Returns whether an emoji id exists on a guild.

## Syntax

```
$guildEmojiExists[guildID;emojiID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull emoji from
- **emojiID** *(text, required)* — The emoji to check for

## Return Value

- Boolean.

## Usage

```
$guildEmojiExists[guildID;emojiID] → result
```

## Example

```bdfd
$sendMessage[$guildEmojiExists[10;70001]]
```
