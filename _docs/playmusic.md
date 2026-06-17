---
layout: doc
title: $playMusic[]
translation_key: docs
category: Music
function_name: playMusic
syntax: $playMusic[query;channelID?;userId?]
description: Plays a track from a search query or URL, auto-joining a voice channel if needed
parameters:
  - name: query
    type: string
    required: true
    description: The search query or direct URL to play (YouTube, SoundCloud, etc.)
  - name: channelID
    type: snowflake
    required: false
    default: "user's current voice channel"
    description: The voice channel ID to play in. If omitted, auto-joins the user's voice channel
  - name: userId
    type: snowflake
    required: false
    default: "current user"
    description: The user ID whose voice channel to join when no channelID is specified
returns:
  type: void
  description: Queues the track for playback; does not return a value
related:
  - pauseMusic
  - skipMusic
  - stopMusic
  - joinVoice
  - leaveVoice
examples:
  - title: Play a song by search query
    code: |
      $playMusic[Never Gonna Give You Up]
      $sendMessage[🎵 Added to queue!]
  - title: Play from a direct URL
    code: |
      $playMusic[https://www.youtube.com/watch?v=dQw4w9WgXcQ]
      $sendMessage[🎵 Queued from URL!]
  - title: Play in a specific voice channel
    code: |
      $playMusic[chill lofi beats;$voiceChannelID]
      $sendMessage[🎵 Playing in <#$voiceChannelID>]
  - title: Play for a specific user's channel
    code: |
      $playMusic[lofi hip hop;;$authorID]
      $sendMessage[🎵 Joining your channel, <@$authorID>!]
---
Searches for a track by query or plays directly from a supported URL (YouTube, SoundCloud, etc.). If the bot is not already in a voice channel, it automatically joins the user's voice channel (or the specified channel). If a track is already playing, the new track is added to the queue.
