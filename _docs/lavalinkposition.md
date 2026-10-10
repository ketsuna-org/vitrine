---
layout: doc
title: $lavalinkPosition[]
translation_key: docs
category: Music
function_name: lavalinkPosition
syntax: $lavalinkPosition[]
description: Returns the current playback position in milliseconds
---
Returns the current playback position of the current track in milliseconds, as a plain number. Combined with $lavalinkDuration (also in milliseconds), you can build progress bars and time displays. Takes no argument. Returns `0` if there is no active player.

## Examples

### Current Track Progress

```bdfd
$title[Track Progress]
$description[Current position: `$lavalinkPosition` / `$lavalinkDuration`]
$color[#AEEA00]
```
