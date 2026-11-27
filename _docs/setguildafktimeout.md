---
layout: doc
title: $setGuildAFKTimeout[]
translation_key: docs
category: "Moderation"
function_name: setGuildAFKTimeout
syntax: $setGuildAFKTimeout[guildID;seconds;(reason)]
description: "Sets the AFK timeout for a guild, returns bool."
---
# $setGuildAFKTimeout — Sets the AFK timeout for a guild, returns bool.

## Syntax

```
$setGuildAFKTimeout[guildID;seconds;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set AFK timeout for
- **seconds** *(number, required)* — The new AFK timeout in seconds (60, 300, 900, 1800, 3600)
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildAFKTimeout[guildID;seconds;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildAFKTimeout[10;300]]
```
