---
layout: doc
title: $lavalinkIsPaused[]
translation_key: docs
category: Music
function_name: lavalinkIsPaused
syntax: $lavalinkIsPaused[]
description: 'Returns "true" if playback is currently paused, "false" otherwise'
---
Returns "true" if the music player is currently paused, and "false" otherwise (including when there is no active player). Takes no argument. Useful for building toggle commands and status displays.

## Examples

### Check Playback State

```bdfd
$title[Player State]
$description[Is playback paused? **$lavalinkIsPaused**]
$color[#AEEA00]
```
