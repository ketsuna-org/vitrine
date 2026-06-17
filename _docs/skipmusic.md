---
layout: doc
title: $skipMusic[]
translation_key: docs
category: Music
function_name: skipMusic
syntax: $skipMusic[]
description: Skips the currently playing track and plays the next track in the queue
returns:
  type: void
  description: Skips to the next track; does not return a value
related:
  - playMusic
  - stopMusic
  - lavalinkQueueSize
examples:
  - title: Skip the current track
    code: |
      $skipMusic[]
      $sendMessage[⏭️ Skipped!]
  - title: Skip with next track info
    code: |
      $skipMusic[]
      $sendMessage[⏭️ Skipped! Now playing: $lavalinkPlaying[]]
  - title: Skip only if queue has tracks
    code: |
      $if[$lavalinkQueueSize[>0]]
      $skipMusic[]
      $sendMessage[⏭️ Skipped! $lavalinkQueueSize[] tracks remaining.]
      $else
      $skipMusic[]
      $sendMessage[⏭️ Skipped! Queue is now empty.]
      $endif
---
Skips the currently playing track. If there are tracks in the queue, the next one begins playing automatically. If the queue is empty, playback stops. Use $lavalinkQueueSize to check how many tracks remain after skipping.
