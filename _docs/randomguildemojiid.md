---
layout: doc
title: $randomGuildEmojiID[]
translation_key: docs
category: "Moderation"
function_name: randomGuildEmojiID
syntax: $randomGuildEmojiID[guildID]
description: "Returns a random emoji ID of a guild."
---
# $randomGuildEmojiID — Returns a random emoji ID of a guild.

## Syntax

```
$randomGuildEmojiID[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get emoji from

## Return Value

- GuildEmoji.

## Usage

```
$randomGuildEmojiID[guildID] → result
```

## Example

```bdfd
$sendMessage[$randomGuildEmojiID[10]]
```
