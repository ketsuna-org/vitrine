---
layout: doc
title: $setMusicVolume[]
translation_key: docs
category: Music
function_name: setMusicVolume
syntax: $setMusicVolume[volume]
description: Sets the music playback volume to a level between 0 and 200
---
Sets the playback volume for the music player. The volume parameter must be a whole number between 0 (completely silent) and 200, inclusive; the default level is 100. Any other value raises the error `Volume must be between 0 and 200.` Use $lavalinkVolume to read the current volume level. Returns an empty string; with no active player nothing happens (the value is not stored).

## Examples

### Adjust Output Volume

```bdfd
$setMusicVolume[80]
$title[Volume Adjusted 🔉]
$description[Master music volume set to **80%**.]
$color[#AEEA00]
```
