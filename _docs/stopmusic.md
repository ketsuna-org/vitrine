---
layout: doc
title: $stopMusic[]
translation_key: docs
category: Music
function_name: stopMusic
syntax: $stopMusic[]
description: Stops music playback and clears the entire queue
returns:
  type: void
  description: Stops playback and clears the queue; does not return a value
related:
  - playMusic
  - pauseMusic
  - skipMusic
  - leaveVoice
examples:
  - title: Stop playback completely
    code: |
      $stopMusic[]
      $sendMessage[⏹️ Playback stopped. Queue cleared.]
  - title: Stop and leave voice channel
    code: |
      $stopMusic[]
      $leaveVoice[]
      $sendMessage[👋 Stopped and left the voice channel.]
  - title: Stop with confirmation embed
    code: |
      $stopMusic[]
      $title[⏹️ Stopped]
      $description[Music playback has been stopped and the queue has been cleared.]
      $color[#FF0000]
---
Stops the music player immediately and clears all tracks from the queue. After calling $stopMusic, the player is idle — no tracks are playing and the queue is empty. The bot remains in the voice channel unless you also call $leaveVoice.
