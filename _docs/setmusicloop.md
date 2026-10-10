---
layout: doc
title: $setMusicLoop[]
translation_key: docs
category: Music
function_name: setMusicLoop
syntax: $setMusicLoop[mode]
description: Sets the looping mode for music playback
---
Sets the looping behavior of the music player. Three modes are available: "off" disables looping entirely; "track" repeats only the currently playing track indefinitely; "queue" repeats the entire queue once all tracks finish. The mode is case-insensitive and surrounding spaces are ignored; `yes` and `true` are accepted as `queue`, `no` and `false` as `off`. Any other value raises the error `Loop mode must be off, track, or queue.` Returns an empty string; with no active player nothing happens. Use $lavalinkIsLooping to check if looping is currently active (it returns "true" for both `track` and `queue`).

## Examples

### Enable Track Looping

```bdfd
$setMusicLoop[track]
$title[Loop Enabled 🔂]
$description[Now looping current track: **$lavalinkPlaying**]
$color[#AEEA00]
```
