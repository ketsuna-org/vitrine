---
layout: doc
title: $setMusicLoop[]
translation_key: docs
category: Music
function_name: setMusicLoop
syntax: $setMusicLoop[mode]
description: Sets the looping mode for music playback
parameters:
  - name: mode
    type: string
    required: true
    description: "The loop mode to set. Accepted values: off, track, queue"
    enum: "off, track, queue"
returns:
  type: void
  description: Sets the loop mode; does not return a value
related:
  - lavalinkIsLooping
examples:
  - title: Enable track looping
    code: |
      $setMusicLoop[track]
      $sendMessage[🔂 Looping the current track.]
  - title: Enable queue looping
    code: |
      $setMusicLoop[queue]
      $sendMessage[🔁 Looping the entire queue.]
  - title: Disable looping
    code: |
      $setMusicLoop[off]
      $sendMessage[➡️ Looping disabled.]
  - title: Cycle through loop modes
    code: |
      $if[$lavalinkIsLooping[==false]]
      $setMusicLoop[track]
      $sendMessage[🔂 Track loop enabled]
      $else
      $setMusicLoop[off]
      $sendMessage[➡️ Looping disabled]
      $endif
---
Sets the looping behavior of the music player. Three modes are available: "off" disables looping entirely; "track" repeats only the currently playing track indefinitely; "queue" repeats the entire queue once all tracks finish. Use $lavalinkIsLooping to check if looping is currently active.
