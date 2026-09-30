---
layout: doc
title: $lavalinkPlaying[]
translation_key: docs
category: Music
function_name: lavalinkPlaying
syntax: $lavalinkPlaying[]
description: Returns the title of the currently playing track
---
Returns the title of the currently playing track from the Lavalink music player. If no track is playing, this returns an empty string. Use this in combination with other Lavalink info functions to build a "now playing" display.

## Examples

### Now Playing Embed with Buttons

```bdfd
$title[Now Playing 🎶]
$description[Title: **$lavalinkPlaying**\nArtist: **$lavalinkAuthor**\nDuration: `$lavalinkPosition / $lavalinkDuration`]
$color[#AEEA00]
$addButton[no;music_pause;Pause;secondary;⏸️]
$addButton[no;music_skip;Skip;secondary;⏭️]
$sendMessage[]
```
