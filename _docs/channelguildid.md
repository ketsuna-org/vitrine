---
layout: doc
title: $channelGuildID[]
translation_key: docs
category: "Entity Info"
function_name: channelGuildID
syntax: $channelGuildID[channelID]
description: "Returns the channel guild id."
---
# $channelGuildID — Returns the channel guild id.

## Syntax

```
$channelGuildID[channelID]
```

## Parameters

- **channelID** *(id, required)* — The id of the channel

## Return Value

- Guild.

## Usage

```
$channelGuildID[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelGuildID]
```
