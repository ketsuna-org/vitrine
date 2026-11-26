---
layout: doc
title: $guildDmsDisabledUntil[]
translation_key: docs
category: "Entity Info"
function_name: guildDmsDisabledUntil
syntax: $guildDmsDisabledUntil[guildID]
description: "Returns the direct messages disabled timestamp of a guild."
---
# $guildDmsDisabledUntil — Returns the direct messages disabled timestamp of a guild.

## Syntax

```
$guildDmsDisabledUntil[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildDmsDisabledUntil[guildID] → result
```

## Example

```bdfd
$sendMessage[Value: $guildDmsDisabledUntil]
```
