---
layout: doc
title: $setGuildExplicitContentFilter[]
translation_key: docs
category: "Moderation"
function_name: setGuildExplicitContentFilter
syntax: $setGuildExplicitContentFilter[guildID;(filter);(reason)]
description: "Sets the explicit content filter for a guild, returns bool."
---
# $setGuildExplicitContentFilter — Sets the explicit content filter for a guild, returns bool.

## Syntax

```
$setGuildExplicitContentFilter[guildID;(filter);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set explicit content filter for
- **filter** *(text, optional)* — The new explicit content filter
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildExplicitContentFilter[guildID;(filter);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildExplicitContentFilter[10;2]]
```
