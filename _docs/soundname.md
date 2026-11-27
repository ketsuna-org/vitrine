---
layout: doc
title: $soundName[]
translation_key: docs
category: "Soundboard"
function_name: soundName
syntax: $soundName[guildID;soundID]
description: "Returns the name of a sound"
---
# $soundName — Returns the name of a sound

## Syntax

```
$soundName[guildID;soundID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sound from
- **soundID** *(id, required)* — The sound to return its name

## Return Value

- String.

## Usage

```
$soundName[guildID;soundID] → result
```

## Example

```bdfd
$sendMessage[$soundName[10;600]]
```
