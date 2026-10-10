---
layout: doc
title: $lavalinkPosition[]
translation_key: docs
category: Music
function_name: lavalinkPosition
syntax: $lavalinkPosition[]
description: Returns the current playback position in milliseconds
---
Returns the current playback position of the currently playing track in milliseconds. Combined with $lavalinkDuration, you can build progress bars and time displays. Returns 0 if no track is playing.

## Examples

### Current Track Progress

```bdfd
$title[Track Progress]
$description[Current position: `$lavalinkPosition` / `$lavalinkDuration`]
$color[#AEEA00]
```
