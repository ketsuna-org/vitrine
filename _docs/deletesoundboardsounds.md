---
layout: doc
title: $deleteSoundboardSounds[]
translation_key: docs
category: "Soundboard"
function_name: deleteSoundboardSounds
syntax: $deleteSoundboardSounds[guildID;sounds...]
description: "Deletes given soundboard sounds, returns the count of sounds deleted"
---
# $deleteSoundboardSounds — Deletes given soundboard sounds, returns the count of sounds deleted

## Syntax

```
$deleteSoundboardSounds[guildID;sounds...]
```

## Parameters

- **guildID** *(id, required)* — The guild to delete soundboard sounds from
- **sounds...** *(text, required)* — The soundboard sounds to delete

## Return Value

- Number.

## Usage

```
$deleteSoundboardSounds[guildID;sounds...] → result
```

## Example

```bdfd
$sendMessage[$deleteSoundboardSounds[10;600]]
```
