---
layout: doc
title: $pauseMusic[]
translation_key: docs
category: Music
function_name: pauseMusic
syntax: $pauseMusic[]
description: Pauses the current music playback
---
Pauses the player of the server. The track can be resumed later with $resumeMusic. Takes no argument and returns an empty string. If the bot has no active player, nothing happens (no error). Requires a server and a configured music (Lavalink) service, otherwise an error is raised. Use $lavalinkIsPaused to check the current pause state.

## Examples

### Pause Playback with Resume Button

```bdfd
$pauseMusic
$title[Music Paused ⏸️]
$description[Audio playback has been paused by <@$authorID>.]
$color[#FEE75C]
$addButton[no;music_resume;Resume;success;▶️]
```
