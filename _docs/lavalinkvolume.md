---
layout: doc
title: $lavalinkVolume[]
translation_key: docs
category: Music
function_name: lavalinkVolume
syntax: $lavalinkVolume[]
description: Returns the current playback volume level (0–100)
returns:
  type: integer
  description: The current volume level as an integer between 0 and 100
related:
  - setMusicVolume
examples:
  - title: Show current volume
    code: |
      $sendMessage[🔊 Current volume: $lavalinkVolume[]%]
  - title: Display volume bar
    code: |
      $let[vol;$lavalinkVolume[]]
      $sendMessage[Volume: $var[vol]%]
  - title: Check and adjust volume
    code: |
      $if[$lavalinkVolume[<50]]
      $sendMessage[Volume is low ($lavalinkVolume[]%). Consider raising it.]
      $endif
---
Returns the current playback volume level as an integer between 0 (silent) and 100 (maximum). Use $setMusicVolume to change the volume.
