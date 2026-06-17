---
layout: doc
title: $seekMusic[]
translation_key: docs
category: Music
function_name: seekMusic
syntax: $seekMusic[position]
description: Seeks to a specific position in the currently playing track
parameters:
  - name: position
    type: integer
    required: true
    description: The position to seek to, in seconds
returns:
  type: void
  description: Seeks to the specified position; does not return a value
related:
  - lavalinkPosition
  - lavalinkDuration
examples:
  - title: Seek to 30 seconds
    code: |
      $seekMusic[30]
      $sendMessage[⏩ Jumped to 30 seconds.]
  - title: Skip to 1 minute
    code: |
      $seekMusic[60]
      $sendMessage[⏩ Jumped to 1:00.]
  - title: Rewind to the beginning
    code: |
      $seekMusic[0]
      $sendMessage[⏪ Restarted from the beginning.]
  - title: Seek forward by 10 seconds
    code: |
      $let[newPos;$sum[$divide[$lavalinkPosition[];1000];10]]
      $seekMusic[$var[newPos]]
      $sendMessage[⏩ Skipped forward 10 seconds.]
---
Seeks to a specific position in the currently playing track. The position parameter is specified in seconds (not milliseconds). Use $lavalinkPosition (which returns milliseconds) to read the current position. Seeking to 0 restarts the track from the beginning.
