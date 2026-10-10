---
layout: doc
title: $lavalinkAuthor[]
translation_key: docs
category: Music
function_name: lavalinkAuthor
syntax: $lavalinkAuthor[]
description: Returns the author/artist of the currently playing track
---
Returns the author (the `author` field of the track reported by Lavalink) of the current track. Takes no argument (`$lavalinkAuthor[x]` is an error). If there is no active player or no current track, returns an empty string.

## Examples

### Display Track Artist

```bdfd
$title[Track Artist 🎤]
$description[Artist: **$lavalinkAuthor**]
$color[#AEEA00]
```
