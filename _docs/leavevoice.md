---
layout: doc
title: $leaveVoice[]
translation_key: docs
category: Music
function_name: leaveVoice
syntax: $leaveVoice[]
description: Leaves the current voice channel
---
Disconnects the bot from the voice channel of the server and destroys the music player of the server: playback stops and the queue is emptied (the server's player session is discarded). Takes no argument and returns an empty string. If the bot has no active player, nothing happens. Requires a server and a configured music (Lavalink) service, otherwise an error is raised.

## Examples

### Disconnect from Voice

```bdfd
$leaveVoice
$title[Voice Disconnected 🔇]
$description[Bot left the voice channel and cleared audio playback.]
$color[#DA373C]
```
