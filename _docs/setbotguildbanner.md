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

```text
$setBotGuildBanner[10;$message[value]]
```

The value passed (`$message[value]`) must be a data URI such as `data:image/png;base64,...`: the function does not download web addresses.
