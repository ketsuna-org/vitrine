---
layout: doc
title: $guildEmojiIDs[]
translation_key: docs
category: "Entity Info"
function_name: guildEmojiIDs
syntax: $guildEmojiIDs[guildID;(separator)]
description: "Returns every emoji id of the guild."
---
# $guildEmojiIDs — Returns every emoji id of the guild.

## Syntax

```
$guildEmojiIDs[guildID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get emoji ids from
- **separator** *(text, optional)* — The separator to use for every emoji

## Return Value

- GuildEmoji[].

## Usage

```
$guildEmojiIDs[guildID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildEmojiIDs[10;,]]
```
