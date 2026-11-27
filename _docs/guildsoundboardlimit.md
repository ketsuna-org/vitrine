---
layout: doc
title: $guildSoundboardLimit[]
translation_key: docs
category: "Entity Info"
function_name: guildSoundboardLimit
syntax: $guildSoundboardLimit[guildID]
description: "Returns the soundboard sound limit of a guild."
---
# $guildSoundboardLimit — Returns the soundboard sound limit of a guild.

## Syntax

```
$guildSoundboardLimit[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildSoundboardLimit[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildSoundboardLimit]
```
