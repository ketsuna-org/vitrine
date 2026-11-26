---
layout: doc
title: $setBotGuildAvatar[]
translation_key: docs
category: "Moderation"
function_name: setBotGuildAvatar
syntax: $setBotGuildAvatar[guildID;(url)]
description: "Sets the bot avatar on a guild"
---
# $setBotGuildAvatar — Sets the bot avatar on a guild

## Syntax

```
$setBotGuildAvatar[guildID;(url)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set avatar on
- **url** *(text, optional)* — The icon url

## Return Value

- Boolean.

## Usage

```
$setBotGuildAvatar[guildID;(url)] → result
```

## Example

```bdfd
$sendMessage[$setBotGuildAvatar[10;data:image/png;base64,iVBORw0KGgo=]]
```
