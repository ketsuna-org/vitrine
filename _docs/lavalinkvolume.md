---
layout: doc
title: $lavalinkVolume[]
translation_key: docs
category: Music
function_name: lavalinkVolume
syntax: $lavalinkVolume[]
description: Returns the current playback volume level (0–200, default 100)
---
Returns the current playback volume level as an integer. The volume set with $setMusicVolume is between 0 (silent) and 200, and 100 is the default level (also returned when there is no active player). Takes no argument.

## Examples

### Display Audio Volume

```bdfd
$title[Volume Level 🔊]
$description[Current audio playback volume: **$lavalinkVolume%**]
$color[#AEEA00]
```
