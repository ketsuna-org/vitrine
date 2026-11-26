---
layout: doc
title: $setBotGuildDescription[]
translation_key: docs
category: "Moderation"
function_name: setBotGuildDescription
syntax: $setBotGuildDescription[guildID;(description)]
description: "Sets the bot description on a guild"
---
# $setBotGuildDescription — Sets the bot description on a guild

## Syntax

```
$setBotGuildDescription[guildID;(description)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set description on
- **description** *(text, optional)* — The new description

## Return Value

- Boolean.

## Usage

```
$setBotGuildDescription[guildID;(description)] → result
```

## Example

```bdfd
$sendMessage[$setBotGuildDescription[10;Hello]]
```
