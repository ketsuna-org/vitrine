---
layout: doc
title: $guildSoundboardSounds[]
translation_key: docs
category: "Entity Info"
function_name: guildSoundboardSounds
syntax: $guildSoundboardSounds[guildID;(property);(separator)]
description: "Returns all soundboard sounds of a guild."
---
# $guildSoundboardSounds — Returns all soundboard sounds of a guild.

## Syntax

```
$guildSoundboardSounds[guildID;(property);(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get soundboard sounds from
- **property** *(text, optional)* — The property of each sound to return
- **separator** *(text, optional)* — The separator to use for each property

## Return Value

- Json,Unknown[].

## Usage

```
$guildSoundboardSounds[guildID;(property);(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildSoundboardSounds[10;name]]
```
