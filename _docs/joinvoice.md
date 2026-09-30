---
layout: doc
title: $joinVoice[]
translation_key: docs
category: Music
function_name: joinVoice
syntax: $joinVoice[channelID?]
description: Joins a voice channel; if no channel ID is given, joins the user's current voice channel
---
Joins a Discord voice channel. If no channel ID is provided, the bot automatically joins the voice channel that the command user is currently connected to. If the user is not in a voice channel, the join will fail. This is called automatically by $playMusic if the bot is not already connected.

## Examples

### Connect Bot to Voice Channel

```bdfd
$joinVoice[$voiceID]
$title[Voice Connected 🔊]
$description[Bot successfully connected to <#$voiceID>!]
$color[#AEEA00]
$sendMessage[]
```
