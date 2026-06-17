---
layout: doc
title: $lavalinkIsPaused[]
translation_key: docs
category: Music
function_name: lavalinkIsPaused
syntax: $lavalinkIsPaused[]
description: 'Returns "true" if playback is currently paused, "false" otherwise'
returns:
  type: boolean
  description: '"true" if the player is paused, "false" if it is playing or idle'
related:
  - pauseMusic
  - resumeMusic
  - lavalinkIsLooping
examples:
  - title: Check pause state
    code: |
      $if[$lavalinkIsPaused[==true]]
      $sendMessage[⏸️ Playback is paused.]
      $else
      $sendMessage[▶️ Music is playing.]
      $endif
  - title: Toggle pause/resume
    code: |
      $if[$lavalinkIsPaused[==true]]
      $resumeMusic[]
      $sendMessage[▶️ Resumed!]
      $else
      $pauseMusic[]
      $sendMessage[⏸️ Paused!]
      $endif
  - title: Display player status
    code: |
      $sendMessage[Paused: $lavalinkIsPaused[] | Looping: $lavalinkIsLooping[]]
---
Returns "true" if the music player is currently paused, and "false" if it is actively playing or stopped. Useful for building toggle commands and status displays.
