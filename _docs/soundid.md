---
layout: doc
title: $soundID[]
translation_key: docs
category: "Soundboard"
function_name: soundID
syntax: $soundID[guildID;name...]
description: "Returns a sound id with given name"
---
# $soundID — Returns a sound id with given name

## Syntax

```
$soundID[guildID;name...]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sound from
- **name...** *(text, required)* — The sound name to return its id

## Return Value

- SoundboardSound.

## Usage

```
$soundID[guildID;name...] → result
```

## Example

```bdfd
$sendMessage[$soundID[10;Honk]]
```
