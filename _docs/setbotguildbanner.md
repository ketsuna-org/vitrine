---
layout: doc
title: $setBotGuildBanner[]
translation_key: docs
category: "Moderation"
function_name: setBotGuildBanner
syntax: $setBotGuildBanner[guildID;(url)]
description: "Sets the bot banner on a guild"
---
# $setBotGuildBanner — Sets the bot banner on a guild

## Syntax

```
$setBotGuildBanner[guildID;(url)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set banner on
- **url** *(text, optional)* — The banner url

## Return Value

- Boolean.

## Usage

```
$setBotGuildBanner[guildID;(url)] → result
```

## Example

```bdfd
$sendMessage[$setBotGuildBanner[10;data:image/png;base64,iVBORw0KGgo=]]
```
