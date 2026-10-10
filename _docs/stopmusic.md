---
layout: doc
title: $stopMusic[]
translation_key: docs
category: Music
function_name: stopMusic
syntax: $stopMusic[]
description: Stops music playback and clears the entire queue
---
Stops playback and clears all tracks from the queue; the paused state is reset. After calling $stopMusic, the player is idle — no tracks are playing and the queue is empty. The bot remains in the voice channel unless you also call $leaveVoice. Takes no argument and returns an empty string; with no active player nothing happens.

## Examples

### Stop Audio Playback

```bdfd
$stopMusic
$title[Music Stopped ⏹️]
$description[Playback stopped and the queue has been cleared.]
$color[#DA373C]
```
