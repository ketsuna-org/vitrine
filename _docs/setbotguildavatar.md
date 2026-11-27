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

```text
$setBotGuildAvatar[10;$message[value]]
```

The value passed (`$message[value]`) must be a data URI such as `data:image/png;base64,...`: the function does not download web addresses.
