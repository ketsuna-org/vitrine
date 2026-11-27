---
layout: doc
title: $soundVolume[]
translation_key: docs
category: "Soundboard"
function_name: soundVolume
syntax: $soundVolume[guildID;soundID]
description: "Returns the volume of a sound"
---
# $soundVolume — Returns the volume of a sound

## Syntax

```
$soundVolume[guildID;soundID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sound from
- **soundID** *(id, required)* — The sound to return its volume

## Return Value

- Number.

## Usage

```
$soundVolume[guildID;soundID] → result
```

## Example

```bdfd
$sendMessage[$soundVolume[10;600]]
```
