---
layout: doc
title: $pauseMusic[]
translation_key: docs
category: Music
function_name: pauseMusic
syntax: $pauseMusic[]
description: Pauses the current music playback
returns:
  type: void
  description: Pauses playback; does not return a value
related:
  - resumeMusic
  - stopMusic
  - lavalinkIsPaused
examples:
  - title: Pause the current track
    code: |
      $pauseMusic[]
      $sendMessage[⏸️ Music paused.]
  - title: Toggle pause and resume
    code: |
      $if[$lavalinkIsPaused[==true]]
      $resumeMusic[]
      $sendMessage[▶️ Resumed!]
      $else
      $pauseMusic[]
      $sendMessage[⏸️ Paused!]
      $endif
  - title: Pause with embed
    code: |
      $pauseMusic[]
      $title[⏸️ Paused]
      $description[Use $resumeMusic[] to continue playback.]
      $color[#FFA500]
---
Pauses the currently playing track. The track can be resumed later with $resumeMusic. If no track is playing, this function has no effect. Use $lavalinkIsPaused to check the current pause state.
