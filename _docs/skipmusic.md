---
layout: doc
title: $skipMusic[]
translation_key: docs
category: Music
function_name: skipMusic
syntax: $skipMusic[]
description: Skips the currently playing track and plays the next track in the queue
---
Skips the currently playing track. If there are tracks in the queue, the next one begins playing automatically. If the queue is empty, playback stops. Use $lavalinkQueueSize to check how many tracks remain after skipping.
