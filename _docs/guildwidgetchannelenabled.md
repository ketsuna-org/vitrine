---
layout: doc
title: $guildWidgetChannelEnabled[]
translation_key: docs
category: "Entity Info"
function_name: guildWidgetChannelEnabled
syntax: $guildWidgetChannelEnabled[guildID]
description: "Returns whether widget channel is enabled for this guild."
---
# $guildWidgetChannelEnabled — Returns whether widget channel is enabled for this guild.

## Syntax

```
$guildWidgetChannelEnabled[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Boolean.

## Usage

```
$guildWidgetChannelEnabled[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildWidgetChannelEnabled]
```
