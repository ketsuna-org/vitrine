---
layout: doc
title: $setGuildDiscoverySplash[]
translation_key: docs
category: "Moderation"
function_name: setGuildDiscoverySplash
syntax: $setGuildDiscoverySplash[guildID;(url);(reason)]
description: "Sets the discovery splash for a guild, returns bool."
---
# $setGuildDiscoverySplash — Sets the discovery splash for a guild, returns bool.

## Syntax

```
$setGuildDiscoverySplash[guildID;(url);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set discovery splash for
- **url** *(text, optional)* — The new discovery splash
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildDiscoverySplash[guildID;(url);(reason)] → result
```

## Example

```text
$setGuildDiscoverySplash[10;$message[value]]
```

The value passed (`$message[value]`) must be a data URI such as `data:image/png;base64,...`: the function does not download web addresses.
