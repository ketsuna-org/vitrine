---
layout: doc
title: $pauseMusic[]
translation_key: docs
category: Music
function_name: pauseMusic
syntax: $pauseMusic[]
description: Pauses the current music playback
---
Pauses the currently playing track. The track can be resumed later with $resumeMusic. If no track is playing, this function has no effect. Use $lavalinkIsPaused to check the current pause state.

## Examples

### Pause Playback with Resume Button

```bdfd
$pauseMusic
$title[Music Paused ⏸️]
$description[Audio playback has been paused by <@$authorID>.]
$color[#FEE75C]
$addButton[no;music_resume;Resume;success;▶️]
```
