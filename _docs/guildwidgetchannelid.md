---
layout: doc
title: $guildWidgetChannelID[]
translation_key: docs
category: "Entity Info"
function_name: guildWidgetChannelID
syntax: $guildWidgetChannelID[guildID]
description: "Returns the widget channel for this guild."
---
# $guildWidgetChannelID — Returns the widget channel for this guild.

## Syntax

```
$guildWidgetChannelID[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Channel.

## Usage

```
$guildWidgetChannelID[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildWidgetChannelID]
```
