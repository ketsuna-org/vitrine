---
layout: doc
title: $seekMusic[]
translation_key: docs
category: Music
function_name: seekMusic
syntax: $seekMusic[position]
description: Seeks to a specific position in the currently playing track
---
Seeks to a specific position in the currently playing track. The position parameter is specified in seconds (not milliseconds). Use $lavalinkPosition (which returns milliseconds) to read the current position. Seeking to 0 restarts the track from the beginning.
