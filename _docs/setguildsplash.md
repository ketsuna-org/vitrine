---
layout: doc
title: $setGuildSplash[]
translation_key: docs
category: "Moderation"
function_name: setGuildSplash
syntax: $setGuildSplash[guildID;(url);(reason)]
description: "Sets a guild splash, returns boolean."
---
# $setGuildSplash — Sets a guild splash, returns boolean.

## Syntax

```
$setGuildSplash[guildID;(url);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set splash on
- **url** *(text, optional)* — The new splash
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildSplash[guildID;(url);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildSplash[10;data:image/png;base64,iVBORw0KGgo=]]
```
