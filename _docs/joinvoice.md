---
layout: doc
title: $joinVoice[]
translation_key: docs
category: Music
function_name: joinVoice
syntax: $joinVoice[channelID?]
description: Joins a voice channel; if no channel ID is given, joins the user's current voice channel
---
Joins a Discord voice channel through the Lavalink music player. Returns an empty string.

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional - ID of the voice channel to join (a positive number, otherwise the error `Invalid voice channel ID.` is raised). If omitted or empty, the bot joins the voice channel the command author is currently connected to; if the author is not in a voice channel, the error `You must be in a voice channel` is raised. |

## Notes

- Requires a server and a configured music (Lavalink) service, otherwise an error is raised (`Music requires a server.` / `Music service is not configured.`).
- $playMusic also connects the bot to the requested voice channel by itself, so $joinVoice is not needed before it.

## Examples

### Connect Bot to Voice Channel

```bdfd
$joinVoice
$title[Voice Connected 🔊]
$description[Bot successfully connected to your voice channel!]
$color[#AEEA00]
```
