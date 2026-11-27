---
layout: doc
title: $setGuildBanner[]
translation_key: docs
category: "Moderation"
function_name: setGuildBanner
syntax: $setGuildBanner[guildID;(url);(reason)]
description: "Sets a guild banner, returns boolean."
---
# $setGuildBanner — Sets a guild banner, returns boolean.

## Syntax

```
$setGuildBanner[guildID;(url);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set banner on
- **url** *(text, optional)* — The new banner
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildBanner[guildID;(url);(reason)] → result
```

## Example

```text
$setGuildBanner[10;$message[value]]
```

The value passed (`$message[value]`) must be a data URI such as `data:image/png;base64,...`: the function does not download web addresses.
