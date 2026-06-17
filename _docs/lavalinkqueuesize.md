---
layout: doc
title: $lavalinkQueueSize[]
translation_key: docs
category: Music
function_name: lavalinkQueueSize
syntax: $lavalinkQueueSize[]
description: Returns the number of tracks currently in the music queue
returns:
  type: integer
  description: The number of tracks waiting in the queue (not including the currently playing track)
related:
  - playMusic
  - skipMusic
  - stopMusic
examples:
  - title: Show queue size
    code: |
      $sendMessage[There are $lavalinkQueueSize[] tracks in the queue.]
  - title: Display queue status
    code: |
      $if[$lavalinkQueueSize[]>0]
      $sendMessage[📋 Queue: $lavalinkQueueSize[] tracks waiting]
      $else
      $sendMessage[📋 The queue is empty.]
      $endif
  - title: Warn when queue is large
    code: |
      $if[$lavalinkQueueSize[>=10]]
      $sendMessage[Queue is getting long! $lavalinkQueueSize[] tracks queued.]
      $endif
---
Returns the number of tracks currently waiting in the music queue. This count does not include the track that is currently playing. Use this to display queue status or check if the queue is empty before adding more tracks.
