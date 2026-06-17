---
layout: doc
title: $lavalinkAuthor[]
translation_key: docs
category: Music
function_name: lavalinkAuthor
syntax: $lavalinkAuthor[]
description: Returns the author/artist of the currently playing track
returns:
  type: string
  description: The author or artist name of the currently playing track, or an empty string if nothing is playing
related:
  - lavalinkPlaying
  - lavalinkDuration
examples:
  - title: Show the track author
    code: |
      $sendMessage[Artist: $lavalinkAuthor[]]
  - title: Display title and author in an embed
    code: |
      $title[$lavalinkPlaying[]]
      $description[by $lavalinkAuthor[]]
      $color[#1DB954]
  - title: Combine title and author
    code: |
      $sendMessage[🎵 $lavalinkPlaying[] — $lavalinkAuthor[]]
---
Returns the author or artist name of the currently playing track. For YouTube tracks, this typically returns the channel name. If no track is playing, returns an empty string.
