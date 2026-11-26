---
layout: doc
title: $getSoundboardSound[]
translation_key: docs
category: "Soundboard"
function_name: getSoundboardSound
syntax: $getSoundboardSound[guildID;soundID;(property)]
description: "Returns a soundboard sound of a guild"
---
# $getSoundboardSound — Returns a soundboard sound of a guild

## Syntax

```
$getSoundboardSound[guildID;soundID;(property)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get soundboard sound from
- **soundID** *(id, required)* — The soundboard sound to get
- **property** *(text, optional)* — The property of the sound to return

## Return Value

- Json.

## Usage

```
$getSoundboardSound[guildID;soundID;(property)] → result
```

## Example

```bdfd
$sendMessage[$getSoundboardSound[10;600;name]]
```
