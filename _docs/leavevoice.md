---
layout: doc
title: $leaveVoice[]
translation_key: docs
category: Music
function_name: leaveVoice
syntax: $leaveVoice[]
description: Leaves the current voice channel
returns:
  type: void
  description: Leaves the voice channel; does not return a value
related:
  - joinVoice
  - stopMusic
examples:
  - title: Leave the voice channel
    code: |
      $leaveVoice[]
      $sendMessage[👋 Left the voice channel!]
  - title: Stop music and leave
    code: |
      $stopMusic[]
      $leaveVoice[]
      $sendMessage[⏹️ Stopped and disconnected.]
  - title: Leave with embed
    code: |
      $leaveVoice[]
      $title[👋 Disconnected]
      $description[The bot has left the voice channel.]
      $color[#FFA500]
---
Leaves the current voice channel and disconnects from voice. Any currently playing music stops immediately. This does not clear the queue — use $stopMusic first if you want to clear the queue before disconnecting.
