---
layout: doc
title: $setGuildWidgetSettings[]
translation_key: docs
category: "Moderation"
function_name: setGuildWidgetSettings
syntax: $setGuildWidgetSettings[guildID;(channelID);(enabled);(reason)]
description: "Sets the widget settings of a guild, returns bool"
---
# $setGuildWidgetSettings — Sets the widget settings of a guild, returns bool

## Syntax

```
$setGuildWidgetSettings[guildID;(channelID);(enabled);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set widget settings on
- **channelID** *(id, optional)* — The invite channel for the widget
- **enabled** *(boolean, optional)* — Whether to enable the widget
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildWidgetSettings[guildID;(channelID);(enabled);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildWidgetSettings[10;30;true]]
```
