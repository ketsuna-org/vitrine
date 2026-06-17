---
layout: doc
title: $lavalinkIsLooping[]
translation_key: docs
category: Music
function_name: lavalinkIsLooping
syntax: $lavalinkIsLooping[]
description: 'Returns "true" if looping is currently enabled, "false" otherwise'
returns:
  type: boolean
  description: '"true" if the player is looping (track or queue), "false" otherwise'
related:
  - setMusicLoop
  - lavalinkIsPaused
examples:
  - title: Check loop state
    code: |
      $if[$lavalinkIsLooping[==true]]
      $sendMessage[🔁 Looping is enabled.]
      $else
      $sendMessage[➡️ Looping is disabled.]
      $endif
  - title: Toggle looping
    code: |
      $if[$lavalinkIsLooping[==true]]
      $setMusicLoop[off]
      $sendMessage[🔁 Looping disabled.]
      $else
      $setMusicLoop[track]
      $sendMessage[🔁 Looping enabled!]
      $endif
  - title: Display player status
    code: |
      $sendMessage[Paused: $lavalinkIsPaused[] | Looping: $lavalinkIsLooping[]]
---
Returns "true" if the music player has looping enabled (either track loop or queue loop). Returns "false" if loop mode is off. Use $setMusicLoop to change the loop mode.
