---
layout: doc
title: $seekMusic[]
translation_key: docs
category: Music
function_name: seekMusic
syntax: $seekMusic[position]
description: Seeks to a specific position in the currently playing track
---
Seeks to a specific position in the current track. The position parameter is a whole number of seconds (not milliseconds); a negative or non-numeric value raises the error `Seek position must be a non-negative number of seconds.` Use $lavalinkPosition (which returns milliseconds) to read the current position. Returns an empty string; with no active player nothing happens.

## Examples

### Seek to Timestamp

```bdfd
$seekMusic[120]
$title[Track Seeked ⏩]
$description[Jumped to position: **2:00** (120 seconds).]
$color[#AEEA00]
```
