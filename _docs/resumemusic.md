---
layout: doc
title: $resumeMusic[]
translation_key: docs
category: Music
function_name: resumeMusic
syntax: $resumeMusic[]
description: Resumes music playback if it was previously paused
returns:
  type: void
  description: Resumes playback; does not return a value
related:
  - pauseMusic
  - stopMusic
  - lavalinkIsPaused
examples:
  - title: Resume playback
    code: |
      $resumeMusic[]
      $sendMessage[▶️ Music resumed.]
  - title: Toggle pause and resume
    code: |
      $if[$lavalinkIsPaused[==true]]
      $resumeMusic[]
      $sendMessage[▶️ Resumed!]
      $else
      $pauseMusic[]
      $sendMessage[⏸️ Paused!]
      $endif
  - title: Resume with embed
    code: |
      $resumeMusic[]
      $title[▶️ Resumed]
      $description[Now playing: $lavalinkPlaying[]]
      $color[#1DB954]
---
Resumes the currently paused track. If no track is paused or playing, this function has no effect. Use $lavalinkIsPaused to check whether playback is currently paused before calling resume.
