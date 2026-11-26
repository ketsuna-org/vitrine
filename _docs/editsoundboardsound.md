---
layout: doc
title: $editSoundboardSound[]
translation_key: docs
category: "Soundboard"
function_name: editSoundboardSound
syntax: $editSoundboardSound[guildID;soundID;(name);(emoji);(volume);(reason)]
description: "Edits given soundboard sound, returns bool"
---
# $editSoundboardSound — Edits given soundboard sound, returns bool

## Syntax

```
$editSoundboardSound[guildID;soundID;(name);(emoji);(volume);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to edit soundboard sound on
- **soundID** *(id, required)* — The soundboard sound to edit
- **name** *(text, optional)* — The new name for the sound
- **emoji** *(text, optional)* — The new emoji for the sound
- **volume** *(number, optional)* — The new volume for the sound (from 0 to 1)
- **reason** *(text, optional)* — The reason for editing the sound

## Return Value

- Boolean.

## Usage

```
$editSoundboardSound[guildID;soundID;(name);(emoji);(volume);(reason)] → result
```

## Example

```bdfd
$sendMessage[$editSoundboardSound[10;600;Boom2;;0.4]]
```
