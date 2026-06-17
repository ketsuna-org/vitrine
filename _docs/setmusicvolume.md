---
layout: doc
title: $setMusicVolume[]
translation_key: docs
category: Music
function_name: setMusicVolume
syntax: $setMusicVolume[volume]
description: Sets the music playback volume to a level between 0 and 100
parameters:
  - name: volume
    type: integer
    required: true
    description: The volume level to set, between 0 (silent) and 100 (maximum)
returns:
  type: void
  description: Sets the volume; does not return a value
related:
  - lavalinkVolume
examples:
  - title: Set volume to 50%
    code: |
      $setMusicVolume[50]
      $sendMessage[🔊 Volume set to 50%.]
  - title: Set volume with feedback
    code: |
      $setMusicVolume[75]
      $sendMessage[🔊 Volume: $lavalinkVolume[]%]
  - title: Increase volume by 10
    code: |
      $let[newVol;$sum[$lavalinkVolume[];10]]
      $if[$var[newVol]>100]
      $let[newVol;100]
      $endif
      $setMusicVolume[$var[newVol]]
      $sendMessage[🔊 Volume: $var[newVol]%]
  - title: Mute and unmute
    code: |
      $if[$lavalinkVolume[>0]]
      $setMusicVolume[0]
      $sendMessage[🔇 Muted.]
      $else
      $setMusicVolume[50]
      $sendMessage[🔊 Unmuted. Volume: 50%]
      $endif
---
Sets the playback volume for the music player. The volume parameter must be an integer between 0 (completely silent) and 100 (maximum volume). Use $lavalinkVolume to read the current volume level. Volume changes take effect immediately on the currently playing track.
