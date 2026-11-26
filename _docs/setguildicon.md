---
layout: doc
title: $setGuildIcon[]
translation_key: docs
category: "Moderation"
function_name: setGuildIcon
syntax: $setGuildIcon[guildID;(url);(reason)]
description: "Sets a guild icon, returns boolean."
---
# $setGuildIcon — Sets a guild icon, returns boolean.

## Syntax

```
$setGuildIcon[guildID;(url);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set icon on
- **url** *(text, optional)* — The new icon
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildIcon[guildID;(url);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildIcon[10;data:image/png;base64,iVBORw0KGgo=]]
```
