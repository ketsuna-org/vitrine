---
layout: doc
title: $lavalinkDuration[]
translation_key: docs
category: Music
function_name: lavalinkDuration
syntax: $lavalinkDuration[]
description: Returns the total duration of the currently playing track in milliseconds
---
Returns the total duration of the current track in milliseconds, as a plain number (never formatted as minutes:seconds). To display minutes and seconds you have to compute them yourself. Takes no argument. Returns `0` if there is no active player or no current track.

## Examples

### Show Song Length

```bdfd
$title[Song Length ⏱️]
$description[Track duration: **$lavalinkDuration**]
$color[#AEEA00]
```
