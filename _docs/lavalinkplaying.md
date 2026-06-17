---
layout: doc
title: $lavalinkPlaying[]
translation_key: docs
category: Music
function_name: lavalinkPlaying
syntax: $lavalinkPlaying[]
description: Returns the title of the currently playing track
returns:
  type: string
  description: The title of the currently playing track, or an empty string if nothing is playing
related:
  - lavalinkAuthor
  - lavalinkDuration
  - lavalinkPosition
examples:
  - title: Show the currently playing track
    code: |
      $sendMessage[Now playing: $lavalinkPlaying[]]
  - title: Display now playing in an embed
    code: |
      $title[Now Playing]
      $description[🎵 $lavalinkPlaying[]]
      $color[#1DB954]
  - title: Check if a track is playing
    code: |
      $if[$lavalinkPlaying[]!=]
      $sendMessage[Currently playing: $lavalinkPlaying[]]
      $else
      $sendMessage[No track is currently playing.]
      $endif
---
Returns the title of the currently playing track from the Lavalink music player. If no track is playing, this returns an empty string. Use this in combination with other Lavalink info functions to build a "now playing" display.
