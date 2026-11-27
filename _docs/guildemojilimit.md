---
layout: doc
title: $guildEmojiLimit[]
translation_key: docs
category: "Entity Info"
function_name: guildEmojiLimit
syntax: $guildEmojiLimit[guildID]
description: "Returns the emoji limit of a guild."
---
# $guildEmojiLimit — Returns the emoji limit of a guild.

## Syntax

```
$guildEmojiLimit[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildEmojiLimit[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildEmojiLimit]
```
