---
layout: doc
title: $guildMaximumPresences[]
translation_key: docs
category: "Entity Info"
function_name: guildMaximumPresences
syntax: $guildMaximumPresences[guildID]
description: "Returns the maximum presences for this guild."
---
# $guildMaximumPresences — Returns the maximum presences for this guild.

## Syntax

```
$guildMaximumPresences[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildMaximumPresences[guildID] → result
```

## Example

```bdfd
$sendMessage[Value: $guildMaximumPresences]
```
