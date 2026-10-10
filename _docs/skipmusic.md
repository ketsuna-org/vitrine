---
layout: doc
title: $skipMusic[]
translation_key: docs
category: Music
function_name: skipMusic
syntax: $skipMusic[]
description: Skips the currently playing track and plays the next track in the queue
---
Skips the current track. If there is a next track in the queue, it begins playing; looping is not applied to a skip (a skip always moves forward, it never replays the current track). If there is no next track, playback stops. Takes no argument and returns an empty string; with no active player nothing happens. Use $lavalinkQueueSize to check how many tracks are still waiting.

## Examples

### Skip to Next Song

```bdfd
$skipMusic
$title[Track Skipped ⏭️]
$description[Skipped to next song in the queue by <@$authorID>.]
$color[#AEEA00]
```
