---
layout: doc
title: $lavalinkPosition[]
translation_key: docs
category: Music
function_name: lavalinkPosition
syntax: $lavalinkPosition[]
description: Returns the current playback position in milliseconds
returns:
  type: integer
  description: The current playback position in milliseconds, or 0 if nothing is playing
related:
  - lavalinkDuration
  - seekMusic
examples:
  - title: Show current position
    code: |
      $sendMessage[Position: $lavalinkPosition[] ms]
  - title: Show position with formatted time
    code: |
      $let[pos;$divide[$lavalinkPosition[];1000]]
      $sendMessage[Current time: $var[pos] seconds]
  - title: Show position and duration together
    code: |
      $sendMessage[$lavalinkPosition[] / $lavalinkDuration[] ms]
---
Returns the current playback position of the currently playing track in milliseconds. Combined with $lavalinkDuration, you can build progress bars and time displays. Returns 0 if no track is playing.
