---
layout: doc
title: $findGuildEmoji[]
translation_key: docs
category: "Entity Info"
function_name: findGuildEmoji
syntax: $findGuildEmoji[guildID;query]
description: "Finds an emoji of a guild"
---
# $findGuildEmoji — Finds an emoji of a guild

## Syntax

```
$findGuildEmoji[guildID;query]
```

## Parameters

- **guildID** *(id, required)* — The guild to find the emoji on
- **query** *(text, required)* — The id, format or emoji name to find

## Return Value

- GuildEmoji.

## Usage

```
$findGuildEmoji[guildID;query] → result
```

## Example

```bdfd
$sendMessage[$findGuildEmoji[10;dance]]
```
