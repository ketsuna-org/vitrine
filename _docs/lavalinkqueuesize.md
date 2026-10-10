---
layout: doc
title: $lavalinkQueueSize[]
translation_key: docs
category: Music
function_name: lavalinkQueueSize
syntax: $lavalinkQueueSize[]
description: Returns the number of tracks currently in the music queue
---
Returns the number of tracks still waiting in the music queue after the current track. This count does not include the track that is currently playing nor the tracks already played. Takes no argument. Returns `0` if there is no active player or nothing is left to play.

## Examples

### Song Queue Length

```bdfd
$title[Music Queue 🎵]
$description[There are **$lavalinkQueueSize** songs waiting in queue.]
$color[#AEEA00]
```
