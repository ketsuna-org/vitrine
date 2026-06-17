---
layout: doc
title: $joinVoice[]
translation_key: docs
category: Music
function_name: joinVoice
syntax: $joinVoice[channelID?]
description: Joins a voice channel; if no channel ID is given, joins the user's current voice channel
parameters:
  - name: channelID
    type: snowflake
    required: false
    default: "user's current voice channel"
    description: The ID of the voice channel to join. If omitted, joins the channel the command user is currently in
returns:
  type: void
  description: Joins the voice channel; does not return a value
related:
  - leaveVoice
  - playMusic
examples:
  - title: Join the user's voice channel
    code: |
      $joinVoice[]
      $sendMessage[🔊 Joined your voice channel!]
  - title: Join a specific voice channel
    code: |
      $joinVoice[1234567890123456789]
      $sendMessage[🔊 Joined the voice channel!]
  - title: Join and start playing music
    code: |
      $joinVoice[]
      $playMusic[lofi hip hop]
      $sendMessage[🎵 Now playing lofi beats!]
  - title: Join a voice channel from a variable
    code: |
      $joinVoice[$voiceChannelID]
      $sendMessage[🔊 Joined <#$voiceChannelID>]
---
Joins a Discord voice channel. If no channel ID is provided, the bot automatically joins the voice channel that the command user is currently connected to. If the user is not in a voice channel, the join will fail. This is called automatically by $playMusic if the bot is not already connected.
