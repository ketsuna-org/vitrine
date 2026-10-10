---
layout: doc
title: $lavalinkIsLooping[]
translation_key: docs
category: Music
function_name: lavalinkIsLooping
syntax: $lavalinkIsLooping[]
description: 'Returns "true" if looping is currently enabled, "false" otherwise'
---
Returns "true" if the music player has looping enabled (either track loop or queue loop). Returns "false" if loop mode is off, or if there is no active player. It does not tell which of the two modes is active. Takes no argument. Use $setMusicLoop to change the loop mode.

## Examples

### Check Loop Mode

```bdfd
$title[Loop Mode Status]
$description[Looping enabled: **$lavalinkIsLooping** 🔁]
$color[#AEEA00]
```
