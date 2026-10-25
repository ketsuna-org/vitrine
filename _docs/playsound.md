---
layout: doc
title: $playSound
translation_key: docs
category: "Soundboard"
function_name: playSound
syntax: $playSound[channelID;soundID]
description: Plays a soundboard sound in a voice channel.
---

# $playSound

Plays a soundboard sound in a voice channel. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$playSound[channelID;soundID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | **Required.** The voice channel ID. The bot must be connected to it. |
| `soundID` | **Required.** The sound ID (see `$listSounds`). |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Speak and Use Soundboard.

## Examples

```bdfd
$playSound[$channelID;$message[1]]
```
