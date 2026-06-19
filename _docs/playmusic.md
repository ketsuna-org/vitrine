---
layout: doc
title: $playMusic[]
translation_key: docs
category: Music
function_name: playMusic
syntax: $playMusic[query;channelID?;userId?]
description: Plays a track from a search query or URL, auto-joining a voice channel if needed
---
Searches for a track by query or plays directly from a supported URL (YouTube, SoundCloud, etc.). If the bot is not already in a voice channel, it automatically joins the user's voice channel (or the specified channel). If a track is already playing, the new track is added to the queue.
