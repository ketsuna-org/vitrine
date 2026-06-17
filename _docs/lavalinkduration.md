---
layout: doc
title: $lavalinkDuration[]
translation_key: docs
category: Music
function_name: lavalinkDuration
syntax: $lavalinkDuration[]
description: Returns the total duration of the currently playing track in milliseconds
returns:
  type: integer
  description: The duration of the currently playing track in milliseconds, or 0 if nothing is playing
related:
  - lavalinkPosition
  - lavalinkPlaying
examples:
  - title: Show the track duration in milliseconds
    code: |
      $sendMessage[Duration: $lavalinkDuration[] ms]
  - title: Convert duration to minutes and seconds
    code: |
      $let[duration;$lavalinkDuration[]]
      $let[minutes;$divide[$var[duration];60000]]
      $let[seconds;$divide[$modulo[$var[duration];60000];1000]]
      $sendMessage[Duration: $var[minutes]:$var[seconds]]
  - title: Show a progress bar
    code: |
      $let[pos;$lavalinkPosition[]]
      $let[dur;$lavalinkDuration[]]
      $sendMessage[$var[pos] / $var[dur] ms]
---
Returns the total duration of the currently playing track in milliseconds. To display a human-readable format (minutes:seconds), divide by 60000 for minutes and use modulo for seconds. Returns 0 if no track is playing.
