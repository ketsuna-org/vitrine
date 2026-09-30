---
layout: doc
title: $lavalinkVolume[]
translation_key: docs
category: Music
function_name: lavalinkVolume
syntax: $lavalinkVolume[]
description: Returns the current playback volume level (0–100)
---
Returns the current playback volume level as an integer between 0 (silent) and 100 (maximum). Use $setMusicVolume to change the volume.

## Examples

### Display Audio Volume

```bdfd
$title[Volume Level 🔊]
$description[Current audio playback volume: **$lavalinkVolume%**]
$color[#AEEA00]
$sendMessage[]
```
