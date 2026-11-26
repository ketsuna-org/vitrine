---
layout: doc
title: $createSoundboardSound[]
translation_key: docs
category: "Soundboard"
function_name: createSoundboardSound
syntax: $createSoundboardSound[guildID;name;file;(emoji);(volume);(reason)]
description: "Creates a new soundboard sound, returns sound id"
---
# $createSoundboardSound — Creates a new soundboard sound, returns sound id

## Syntax

```
$createSoundboardSound[guildID;name;file;(emoji);(volume);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to create soundboard sound on
- **name** *(text, required)* — The name for the sound
- **file** *(text, required)* — The file for the sound
- **emoji** *(text, optional)* — The emoji for the sound
- **volume** *(number, optional)* — The volume for the sound (from 0 to 1)
- **reason** *(text, optional)* — The reason for creating the sound

## Return Value

- SoundboardSound.

## Usage

```
$createSoundboardSound[guildID;name;file;(emoji);(volume);(reason)] → result
```

## Example

```text
$createSoundboardSound[10;Boom;$message[value];🔊;0.8]
```

The value passed (`$message[value]`) must be a data URI such as `data:audio/mpeg;base64,...`: the function does not download web addresses.
