---
layout: doc
title: $soundAvailable[]
translation_key: docs
category: "Soundboard"
function_name: soundAvailable
syntax: $soundAvailable[guildID;soundID]
description: "Returns whether a sound is available"
---
# $soundAvailable — Returns whether a sound is available

## Syntax

```
$soundAvailable[guildID;soundID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sound from
- **soundID** *(id, required)* — The sound to return its available status

## Return Value

- Boolean.

## Usage

```
$soundAvailable[guildID;soundID] → result
```

## Example

```bdfd
$sendMessage[$soundAvailable[10;600]]
```
